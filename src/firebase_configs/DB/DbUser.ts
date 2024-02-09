import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  limit,
  query,
  where,
} from 'firebase/firestore';

import { CollectionName } from '@/@types/enum';

import { db } from '../config';

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
}

export default DbUser;
