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
      ClassAcademicStartYear: new Date(
        data.ClassAcademicStartYear,
      ) as unknown as Timestamp,
      ClassAcademicEndYear: new Date(
        data.ClassAcademicEndYear,
      ) as unknown as Timestamp,
      ClassArmCount: 0,
      ClassStudentsCount: 0,
      ClassCourseId: '',
      ClassCreatedAt: serverTimestamp(),
    };

    return setDoc(docRef, newClass);
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

  static deleteCourse = (courseId: string) => {
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

  static createSubject = async (
    instituteId: string,
    data: SubjectFormFields,
  ) => {
    const subjectId = getNewDocId(CollectionName.subjects);
    const subjectRef = doc(db, CollectionName.subjects, subjectId);

    const newSubject: ISubjectsCollection = {
      SubjectId: subjectId,
      SubjectClassId: data.subjectClassId,
      SubjectClassName: data.subjectClassName,
      SubjectInstituteId: instituteId,
      SubjectName: data.subjectName,
      SubjectCreatedAt: serverTimestamp(),
    };

    return setDoc(subjectRef, newSubject);
  };

  static deleteSubject = async (subjectId: string) => {
    try {
      const subjectRef = doc(db, CollectionName.subjects, subjectId);
      await deleteDoc(subjectRef);
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  static getSubjects = ({
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

    if (lastDoc) {
      queryParams = [...queryParams, startAfter(lastDoc)];
    }

    if (lmt) {
      queryParams = [...queryParams, limit(lmt)];
    }
    const courseQuery = query(subjectRef, ...queryParams);

    return getDocs(courseQuery);
  };
}

export default DbClass;
