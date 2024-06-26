import dayjs from 'dayjs';
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
  orderBy,
  query,
  runTransaction,
  serverTimestamp,
  startAfter,
  where,
} from 'firebase/firestore';

import type {
  IAttendanceCollection,
  IAttendancePresentStudentList,
  IClassesCollection,
  IStudentsCollection,
} from '@/@types/database';
import { CollectionName } from '@/@types/enum';
import type { CreateStudentFields } from '@/app/students/create_student/page';
import CustomError from '@/lib/CustomError';
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

    //* Check if any student with this email id already exist

    const studentsRef = collection(db, CollectionName.students);
    const studentsQuery = query(
      studentsRef,
      where('StudentEmail', '==', data.StudentEmail),
      limit(1),
    );
    const studentsSnapshot = await getDocs(studentsQuery);

    if (!studentsSnapshot.empty) {
      throw new CustomError('Student with this email already exist');
    }

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

  static deleteStudent = async (studentId: string) => {
    const studentRef = doc(db, CollectionName.students, studentId);

    await runTransaction(db, async transaction => {
      const snapshot = await transaction.get(studentRef);
      const studentData = snapshot.data() as IStudentsCollection;

      const { StudentClassId } = studentData;

      const classRef = doc(db, CollectionName.classes, StudentClassId);
      const classSnapshot = await transaction.get(classRef);
      const classData = classSnapshot.data() as IClassesCollection;

      transaction.update(classRef, {
        ClassStudentsCount: classData.ClassStudentsCount - 1,
      });

      transaction.delete(studentRef);
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
      const snapshot = await transaction.get(attendanceRef);
      if (!snapshot.exists()) {
        throw new CustomError('Attendance sheet not found');
      }
      const attendanceData = snapshot.data() as IAttendanceCollection;

      const { AttendanceStatus, AttendancePresentStudentList } = attendanceData;

      if (AttendanceStatus === 'completed') {
        throw new CustomError('This attendance sheet is already submitted');
      }

      if (
        AttendancePresentStudentList.find(res => res.StudentId === studentId)
      ) {
        throw new CustomError(
          'You have already marked your attendance for this session',
        );
      }

      transaction.update(attendanceRef, {
        AttendancePresentStudentList: arrayUnion(...studentData),
      });
    });
  };

  static getStudentAttendanceSheets = ({
    lastDoc,
    lmt,
    classId,
    subjectId,
    endDate,
    isLifeTime,
    startDate,
  }: {
    classId: string;
    lmt?: number | null;
    lastDoc?: DocumentData | null;
    subjectId?: string | null;
    startDate?: Date | null;
    endDate?: Date | null;
    isLifeTime?: boolean;
  }) => {
    const attendanceRef = collection(db, CollectionName.attendances);

    let queryParams: QueryConstraint[] = [
      where('AttendanceClassId', '==', classId),
      orderBy('AttendanceCreatedAt', 'desc'),
    ];

    if (subjectId) {
      queryParams = [
        ...queryParams,
        where('AttendanceSubjectId', '==', subjectId),
      ];
    }

    if (!isLifeTime) {
      queryParams = [
        ...queryParams,
        where(
          'AttendanceCreatedAt',
          '>=',
          dayjs(startDate).startOf('day').toDate(),
        ),
        where(
          'AttendanceCreatedAt',
          '<=',
          dayjs(endDate).endOf('day').toDate(),
        ),
      ];
    }

    if (lastDoc) {
      queryParams = [...queryParams, startAfter(lastDoc)];
    }

    if (lmt) {
      queryParams = [...queryParams, limit(lmt)];
    }
    const attendanceQuery = query(attendanceRef, ...queryParams);

    return getDocs(attendanceQuery);
  };
}

export default DbStudent;
