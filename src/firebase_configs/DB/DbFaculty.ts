import type { DocumentData, QueryConstraint } from 'firebase/firestore';
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  startAfter,
  where,
} from 'firebase/firestore';

import type { IFacultiesCollection } from '@/@types/database';
import { CollectionName } from '@/@types/enum';
import type { CreateFacultyFields } from '@/app/faculties/create_faculty/page';
import CustomError from '@/lib/CustomError';
import { fullTextSearchIndex } from '@/lib/misc';

import { db } from '../config';
import { getNewDocId } from './utils';

class DbFaculty {
  static createFaculty = async (
    instituteId: string,
    data: CreateFacultyFields,
  ) => {
    const facultyId = getNewDocId(CollectionName.faculties);
    const facultyRef = doc(db, CollectionName.faculties, facultyId);

    const {
      FacultyEmail,
      FacultyFirstName,
      FacultyLastName,
      FacultyPassword,
      FacultyPhone,
    } = data;

    //* Check if any faculty with this email id already exist

    const facultiesRef = collection(db, CollectionName.faculties);
    const facultyQuery = query(
      facultiesRef,
      where('FacultyEmail', '==', FacultyEmail),
      limit(1),
    );
    const facultySnapshot = await getDocs(facultyQuery);

    if (!facultySnapshot.empty) {
      throw new CustomError('Faculty with this email already exist');
    }

    const FacultyNameSearchIndex = fullTextSearchIndex(
      `${FacultyFirstName.trim().toLowerCase()}${FacultyLastName.trim().toLowerCase()}`,
    );

    const newFaculty: IFacultiesCollection = {
      FacultyId: facultyId,
      FacultyFirstName,
      FacultyLastName,
      FacultyNameSearchIndex,
      FacultyPhone,
      FacultyEmail,
      FacultyPassword,
      FacultyInstituteId: instituteId,
      FacultyCreatedAt: serverTimestamp(),
      FacultyModifiedAt: serverTimestamp(),
    };

    return setDoc(facultyRef, newFaculty);
  };

  static getFaculties = ({
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
    const courseRef = collection(db, CollectionName.faculties);

    let queryParams: QueryConstraint[] = [
      where('FacultyInstituteId', '==', instituteId),
      orderBy('FacultyCreatedAt', 'desc'),
    ];

    if (searchQuery) {
      queryParams = [
        ...queryParams,
        where('FacultyNameSearchIndex', 'array-contains', searchQuery),
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

  static getFacultyById = async (facultyId: string) => {
    const facultyRef = doc(db, CollectionName.faculties, facultyId);

    const snapshot = await getDoc(facultyRef);

    return snapshot.data() as IFacultiesCollection;
  };

  static deleteFaculty = async (facultyId: string) => {
    const sessionRef = collection(db, CollectionName.sessions);
    const sessionQuery = query(
      sessionRef,
      where('SessionFacultyId', '==', facultyId),
      limit(1),
    );
    const snapshot = await getDocs(sessionQuery);

    if (!snapshot.empty) {
      throw new CustomError(
        'Session with this faculty already exist, please delete the session first to delete this faculty',
      );
    }

    const facultyRef = doc(db, CollectionName.faculties, facultyId);

    return deleteDoc(facultyRef);
  };

  static getFacultyFromCred = (email: string, password: string) => {
    const facultyRef = collection(db, CollectionName.faculties);

    const facultyQuery = query(
      facultyRef,
      where('FacultyEmail', '==', email),
      where('FacultyPassword', '==', password),
      limit(1),
    );

    return getDocs(facultyQuery);
  };
}

export default DbFaculty;
