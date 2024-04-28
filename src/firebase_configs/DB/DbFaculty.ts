import type { DocumentData, QueryConstraint } from 'firebase/firestore';
import {
  collection,
  deleteDoc,
  doc,
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
import { fullTextSearchIndex } from '@/lib/misc';

import { db } from '../config';
import { getNewDocId } from './utils';

class DbFaculty {
  static createFaculty = (instituteId: string, data: CreateFacultyFields) => {
    const facultyId = getNewDocId(CollectionName.faculties);
    const facultyRef = doc(db, CollectionName.faculties, facultyId);

    const {
      FacultyEmail,
      FacultyFirstName,
      FacultyLastName,
      FacultyPassword,
      FacultyPhone,
    } = data;

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

  static deleteFaculty = (facultyId: string) => {
    const facultyRef = doc(db, CollectionName.faculties, facultyId);
    return deleteDoc(facultyRef);
  };
}

export default DbFaculty;
