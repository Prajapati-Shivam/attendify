import type {
  DocumentData,
  QueryConstraint,
  Timestamp,
} from 'firebase/firestore';
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  limit,
  query,
  serverTimestamp,
  setDoc,
  startAfter,
  where,
} from 'firebase/firestore';

import type { IClassesCollection, ICoursesCollection } from '@/@types/database';
import { CollectionName } from '@/@types/enum';
import type { CreateClassFields } from '@/app/classes/create_class/page';

import { db } from '../config';
import { getNewDocId } from './utils';

class DbClass {
  static createClass = (data: CreateClassFields, instituteId: string) => {
    const classId = getNewDocId(CollectionName.classes);
    const docRef = doc(db, CollectionName.classes, classId);
    const newClass: IClassesCollection = {
      ClassId: classId,
      ClassInstituteId: instituteId,
      ClassName: data.className,
      ClassAcademicStartYear: new Date(data.startYear) as unknown as Timestamp,
      ClassAcademicEndYear: new Date(data.endYear) as unknown as Timestamp,
      ClassArmCount: 0,
      ClassStudentsCount: 0,
      ClassCourseId: '',
      ClassCreatedAt: serverTimestamp(),
    };

    return setDoc(docRef, newClass);
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
  }: {
    instituteId: string;
    lmt?: number | null;
    lastDoc?: DocumentData | null;
  }) => {
    const courseRef = collection(db, CollectionName.courses);

    let queryParams: QueryConstraint[] = [
      where('CourseInstituteId', '==', instituteId),
    ];

    if (lastDoc) {
      queryParams = [...queryParams, startAfter(lastDoc)];
    }

    if (lmt) {
      queryParams = [...queryParams, limit(lmt)];
    }
    const courseQuery = query(courseRef, ...queryParams);

    return getDocs(courseQuery);
  };
}

export default DbClass;
