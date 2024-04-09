import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  limit,
  query,
  runTransaction,
  serverTimestamp,
  setDoc,
  where,
} from 'firebase/firestore';

import type {
  IAdminsCollection,
  ICoursesCollection,
  IInstitutesCollection,
} from '@/@types/database';
import { CollectionName } from '@/@types/enum';
import type { InstituteFormFields } from '@/components/institute/InstituteForm';

import { db } from '../config';
import { getNewDocId } from './utils';

class DbUser {
  static getUserLoggedInData = async (
    loggedInId: string,
    loggedInCrypt: string,
    isLoggedIn: boolean,
    userType: 'admin' | 'faculty' | 'student',
  ) => {
    const loggedInRef = collection(db, CollectionName.loggedInUsers);

    const loggedInQuery = query(
      loggedInRef,
      where('LoggedInId', '==', loggedInId),
      where('LoggedInCrypt', '==', loggedInCrypt),
      where('IsLoggedIn', '==', isLoggedIn),
      where('LoggedInUserType', '==', userType),
      limit(1),
    );

    return getDocs(loggedInQuery);
  };

  static deleteUserLoggedInDoc = async (loggedInId: string) => {
    const loggedInRef = doc(db, CollectionName.loggedInUsers, loggedInId);
    await deleteDoc(loggedInRef);
  };

  static getAdminById = (adminId: string) => {
    const docRef = doc(db, CollectionName.admins, adminId);

    return getDoc(docRef);
  };

  static getAdminInstitute = (adminId: string) => {
    const docRef = collection(db, CollectionName.institute);

    const docQuery = query(
      docRef,
      where('InstituteAdminId', '==', adminId),
      limit(1),
    );

    return getDocs(docQuery);
  };

  static createNewInstitute = async (
    data: InstituteFormFields,
    adminId: string,
  ) => {
    const InstituteId = getNewDocId(CollectionName.institute);

    const newInstitute: IInstitutesCollection = {
      InstituteId,
      InstituteName: data.instituteName,
      InstituteAddress: data.instituteAddress,
      InstituteAdminId: adminId,
      InstitutePhone: data.institutePhone,
      InstituteAddedAt: serverTimestamp(),
      InstituteEmail: data.instituteEmail,
      InstituteWebsite: data.instituteWebsite,
    };

    const adminUpdateData: Partial<IAdminsCollection> = {
      AdminFirstName: data.firstName,
      AdminLastName: data.lastName,
      AdminNameChangeTime: serverTimestamp(),
    };

    await runTransaction(db, async transaction => {
      const adminDocRef = doc(db, CollectionName.admins, adminId);

      transaction.update(adminDocRef, adminUpdateData);

      const instituteDocRef = doc(db, CollectionName.institute, InstituteId);

      transaction.set(instituteDocRef, newInstitute);
    });

    return newInstitute;
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
}

export default DbUser;
