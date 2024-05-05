import type {
  DocumentData,
  QueryConstraint,
  Timestamp,
} from 'firebase/firestore';
import {
  arrayUnion,
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  query,
  runTransaction,
  serverTimestamp,
  startAfter,
  where,
} from 'firebase/firestore';

import type {
  IAttendancePresentStudentList,
  IClassesCollection,
  IStudentsCollection,
} from '@/@types/database';
import { CollectionName } from '@/@types/enum';
import type { CreateStudentFields } from '@/app/students/create_student/page';
import { fullTextSearchIndex } from '@/lib/misc';

import { db } from '../config';
import { getNewDocId } from './utils';

class DbStudent {
  static createStudent = async (
    data: CreateStudentFields,
    instituteId: string,
  ) => {
    const studentId = getNewDocId(CollectionName.students);
    const studentRef = doc(db, CollectionName.students, studentId);

    await runTransaction(db, async transaction => {
      const {
        StudentClassId,
        StudentCourseEndYear,
        StudentCourseId,
        StudentCourseStartYear,
        StudentEmail,
        StudentFullName,
        StudentPassword,
        StudentPhone,
        StudentRollNo,
        StudentUniqueId,
        StudentClassArmId,
      } = data;

      const classRef = doc(db, CollectionName.classes, data.StudentClassId);
      const classSnapshot = await transaction.get(classRef);
      const classData = classSnapshot.data() as IClassesCollection;

      const newStudent: IStudentsCollection = {
        StudentId: studentId,
        StudentFullName,
        StudentNameSearchIndex: fullTextSearchIndex(
          StudentFullName.trim().toLowerCase(),
        ),
        StudentPhone,
        StudentEmail,
        StudentPassword,
        StudentUniqueId,
        StudentRollNo,
        StudentCourseId,
        StudentClassId,
        StudentClassArmId: StudentClassArmId || null,
        StudentCourseStartYear: StudentCourseStartYear as unknown as Timestamp,
        StudentCourseEndYear: StudentCourseEndYear as unknown as Timestamp,
        StudentInstituteId: instituteId,
        StudentCreateTime: serverTimestamp(),
        StudentModifiedAt: serverTimestamp(),
      };

      transaction.update(classRef, {
        ClassStudentsCount: classData.ClassStudentsCount + 1,
      });

      transaction.set(studentRef, newStudent);
    });
  };

  static getStudents = ({
    instituteId,
    lastDoc,
    lmt,
    searchQuery,
  }: {
    instituteId: string;
    lmt?: number | null;
    lastDoc?: DocumentData | null;
    searchQuery?: string | null;
  }) => {
    const studentRef = collection(db, CollectionName.students);

    let queryParams: QueryConstraint[] = [
      where('StudentInstituteId', '==', instituteId),
    ];

    if (searchQuery) {
      queryParams = [
        ...queryParams,
        where('StudentNameSearchIndex', 'array-contains', searchQuery),
      ];
    }

    if (lastDoc) {
      queryParams = [...queryParams, startAfter(lastDoc)];
    }

    if (lmt) {
      queryParams = [...queryParams, limit(lmt)];
    }

    const studentQuery = query(studentRef, ...queryParams);

    return getDocs(studentQuery);
  };

  static getStudentById = async (studentId: string) => {
    const studentRef = doc(db, CollectionName.students, studentId);
    const snapshot = await getDoc(studentRef);
    return snapshot.data() as IStudentsCollection;
  };

  static getStudentFromCred = (email: string, password: string) => {
    const studentRef = collection(db, CollectionName.students);

    const studentQuery = query(
      studentRef,
      where('StudentEmail', '==', email),
      where('StudentPassword', '==', password),
      limit(1),
    );

    return getDocs(studentQuery);
  };

  static giveAttendance = async ({
    attendanceId,
    studentId,
    studentName,
    studentMacAddress,
  }: {
    attendanceId: string;
    studentId: string;
    studentName: string;
    studentMacAddress: string;
  }) => {
    const studentData: IAttendancePresentStudentList[] = [
      {
        StudentId: studentId,
        StudentIsPresent: true,
        StudentMacAddress: studentMacAddress,
        StudentName: studentName,
      },
    ];

    const attendanceRef = doc(db, CollectionName.attendances, attendanceId);

    await runTransaction(db, async transaction => {
      transaction.update(attendanceRef, {
        AttendancePresentStudentList: arrayUnion(...studentData),
      });
    });
  };
}

export default DbStudent;
