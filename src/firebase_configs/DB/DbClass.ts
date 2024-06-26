import type {
  DocumentData,
  QueryConstraint,
  Timestamp,
} from 'firebase/firestore';
import {
  collection,
  deleteDoc,
  doc,
  endAt,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  runTransaction,
  serverTimestamp,
  setDoc,
  startAfter,
  startAt,
  where,
} from 'firebase/firestore';

import type {
  IClassesCollection,
  ICoursesCollection,
  ISubjectsCollection,
} from '@/@types/database';
import { CollectionName } from '@/@types/enum';
import type { CreateClassFields } from '@/app/classes/create_class/page';
import type { SubjectFormFields } from '@/components/subject/CreateSubject';
import CustomError from '@/lib/CustomError';

import { db } from '../config';
import { getNewDocId } from './utils';

class DbClass {
  static createClass = (data: CreateClassFields, instituteId: string) => {
    const classId = getNewDocId(CollectionName.classes);
    const docRef = doc(db, CollectionName.classes, classId);
    const newClass: IClassesCollection = {
      ClassId: classId,
      ClassInstituteId: instituteId,
      ClassName: data.ClassName,
      ClassAcademicStartYear:
        data.ClassAcademicStartYear as unknown as Timestamp,
      ClassAcademicEndYear: data.ClassAcademicEndYear as unknown as Timestamp,
      ClassArmCount: 0,
      ClassStudentsCount: 0,
      ClassSubjectsCount: 0,
      ClassCourseId: data.ClassCourseId,
      ClassCreatedAt: serverTimestamp(),
    };

    return setDoc(docRef, newClass);
  };

  static deleteClass = async (classId: string) => {
    const studentRef = collection(db, CollectionName.students);
    const studentQuery = query(
      studentRef,
      where('StudentClassId', '==', classId),
    );
    const snapshot = await getDocs(studentQuery);
    if (!snapshot.empty) {
      throw new CustomError(
        'Student with this class already exist, please delete the student first to delete this class',
      );
    }

    const classRef = doc(db, CollectionName.classes, classId);

    return deleteDoc(classRef);
  };

  static getClasses = ({
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
    const courseRef = collection(db, CollectionName.classes);

    let queryParams: QueryConstraint[] = [
      where('ClassInstituteId', '==', instituteId),
    ];

    if (searchQuery) {
      queryParams = [
        ...queryParams,
        orderBy('ClassName'),
        startAt(searchQuery),
        endAt(`${searchQuery}\uF8FF`),
      ];
    }

    if (lastDoc) {
      queryParams = [...queryParams, startAfter(lastDoc)];
    }

    if (lmt) {
      queryParams = [...queryParams, limit(lmt)];
    }
    const courseQuery = query(courseRef, ...queryParams);

    return getDocs(courseQuery);
  };

  static createNewCourse = (
    instituteId: string,
    fullName: string,
    shortName: string,
  ) => {
    const courseId = getNewDocId(CollectionName.courses);
    const courseRef = doc(db, CollectionName.courses, courseId);

    const newCourse: ICoursesCollection = {
      CourseId: courseId,
      CourseInstituteId: instituteId,
      CourseFullName: fullName,
      CourseShortName: shortName,
      CourseCreatedAt: serverTimestamp(),
    };

    return setDoc(courseRef, newCourse);
  };

  static deleteCourse = async (courseId: string) => {
    const classRef = collection(db, CollectionName.classes);
    const classQuery = query(classRef, where('ClassCourseId', '==', courseId));
    const snapshot = await getDocs(classQuery);
    if (!snapshot.empty) {
      throw new CustomError(
        'Class with course already exist, please delete that class first to delete this course',
      );
    }

    const courseRef = doc(db, CollectionName.courses, courseId);

    return deleteDoc(courseRef);
  };

  static getCourses = ({
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
    const courseRef = collection(db, CollectionName.courses);

    let queryParams: QueryConstraint[] = [
      where('CourseInstituteId', '==', instituteId),
    ];

    if (searchQuery) {
      queryParams = [
        ...queryParams,
        orderBy('CourseShortName'),
        startAt(searchQuery),
        endAt(`${searchQuery}\uF8FF`),
      ];
    }

    if (lastDoc) {
      queryParams = [...queryParams, startAfter(lastDoc)];
    }

    if (lmt) {
      queryParams = [...queryParams, limit(lmt)];
    }
    const courseQuery = query(courseRef, ...queryParams);

    return getDocs(courseQuery);
  };

  static getCourseById = async (courseId: string) => {
    const courseRef = doc(db, CollectionName.courses, courseId);

    const snapshot = await getDoc(courseRef);

    return snapshot.data() as ICoursesCollection;
  };

  static getClassById = async (classId: string) => {
    const courseRef = doc(db, CollectionName.classes, classId);

    const snapshot = await getDoc(courseRef);

    return snapshot.data() as IClassesCollection;
  };

  static createSubject = async (
    instituteId: string,
    data: SubjectFormFields,
  ) => {
    const subjectId = getNewDocId(CollectionName.subjects);
    const subjectRef = doc(db, CollectionName.subjects, subjectId);

    await runTransaction(db, async transaction => {
      const classRef = doc(db, CollectionName.classes, data.subjectClassId);
      const classSnapshot = await transaction.get(classRef);
      const classData = classSnapshot.data() as IClassesCollection;

      const newSubject: ISubjectsCollection = {
        SubjectId: subjectId,
        SubjectClassId: data.subjectClassId,
        SubjectClassName: classData.ClassName,
        SubjectInstituteId: instituteId,
        SubjectName: data.subjectName,
        SubjectCreatedAt: serverTimestamp(),
      };

      transaction.update(classRef, {
        ClassSubjectsCount: classData.ClassSubjectsCount + 1,
      });

      transaction.set(subjectRef, newSubject);
    });
  };

  static deleteSubject = async (subjectId: string) => {
    const sessionRef = collection(db, CollectionName.sessions);
    const sessionQuery = query(
      sessionRef,
      where('SessionSubjectId', '==', subjectId),
      limit(1),
    );
    const snapshot = await getDocs(sessionQuery);

    if (!snapshot.empty) {
      throw new CustomError(
        'Session with this subject already exist, please delete the session first to delete this subject',
      );
    }

    await runTransaction(db, async transaction => {
      const subjectRef = doc(db, CollectionName.subjects, subjectId);
      const subjectSnapshot = await transaction.get(subjectRef);
      const subjectData = subjectSnapshot.data() as ISubjectsCollection;
      const { SubjectClassId } = subjectData;

      const classRef = doc(db, CollectionName.classes, SubjectClassId);
      const classSnapshot = await transaction.get(classRef);
      const classData = classSnapshot.data() as IClassesCollection;

      transaction.update(classRef, {
        ClassSubjectsCount: classData.ClassSubjectsCount - 1,
      });

      transaction.delete(subjectRef);
    });
  };

  static getSubjects = ({
    instituteId,
    lastDoc,
    lmt,
    searchQuery,
    classId,
  }: {
    instituteId: string;
    lmt?: number | null;
    lastDoc?: DocumentData | null;
    searchQuery?: string | null;
    classId?: string | null;
  }) => {
    const subjectRef = collection(db, CollectionName.subjects);

    let queryParams: QueryConstraint[] = [
      where('SubjectInstituteId', '==', instituteId),
    ];

    if (searchQuery) {
      queryParams = [
        ...queryParams,
        orderBy('SubjectName'),
        startAt(searchQuery),
        endAt(`${searchQuery}\uF8FF`),
      ];
    }

    if (classId) {
      queryParams = [...queryParams, where('SubjectClassId', '==', classId)];
    }

    if (lastDoc) {
      queryParams = [...queryParams, startAfter(lastDoc)];
    }

    if (lmt) {
      queryParams = [...queryParams, limit(lmt)];
    }
    const courseQuery = query(subjectRef, ...queryParams);

    return getDocs(courseQuery);
  };

  static getSubjectById = async (subjectId: string) => {
    const subjectRef = doc(db, CollectionName.subjects, subjectId);

    const snapshot = await getDoc(subjectRef);

    return snapshot.data() as ISubjectsCollection;
  };

  static getAllStudentsOfClass = (classId: string) => {
    const studentRef = collection(db, CollectionName.students);
    const studentQuery = query(
      studentRef,
      where('StudentClassId', '==', classId),
    );

    return getDocs(studentQuery);
  };
}

export default DbClass;
