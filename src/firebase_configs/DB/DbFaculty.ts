import { doc, serverTimestamp, setDoc } from 'firebase/firestore';

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
      FacultyCreateTime: serverTimestamp(),
      FacultyNameChangeTime: serverTimestamp(),
    };

    return setDoc(facultyRef, newFaculty);
  };
}

export default DbFaculty;
