import { collection, getDocs, limit, query, where } from 'firebase/firestore';

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
}

export default DbUser;
