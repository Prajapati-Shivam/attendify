import type { Timestamp } from 'firebase/firestore';
import { doc, serverTimestamp, setDoc } from 'firebase/firestore';

import type { IClassesCollection } from '@/@types/database';
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
      ClassCreatedAt: serverTimestamp(),
    };

    return setDoc(docRef, newClass);
  };
}

export default DbClass;
