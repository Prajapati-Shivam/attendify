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
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  startAfter,
  where,
} from 'firebase/firestore';

import type { ISessionsCollection } from '@/@types/database';
import { CollectionName } from '@/@types/enum';
import type { CreateSessionFields } from '@/app/sessions/create_session/page';
import { removeTimeFromDate } from '@/lib/misc';

import { db } from '../config';
import { getNewDocId } from './utils';

class DbSession {
  static createSession = (instituteId: string, data: CreateSessionFields) => {
    const sessionId = getNewDocId(CollectionName.sessions);
    const sessionRef = doc(db, CollectionName.sessions, sessionId);

    const {
      SessionClassId,
      SessionClassName,
      SessionDate,
      SessionEndTime,
      SessionFacultyId,
      SessionFacultyName,
      SessionStartTime,
      SessionSubjectId,
      SessionSubjectName,
    } = data;

    const newSession: ISessionsCollection = {
      SessionId: sessionId,
      SessionInstituteId: instituteId,
      SessionIsAttendanceSheetGenerated: false,
      SessionClassId,
      SessionClassName,
      SessionFacultyId,
      SessionFacultyName,
      SessionSubjectId,
      SessionSubjectName,
      SessionStartTime,
      SessionEndTime,
      SessionDate: removeTimeFromDate(SessionDate) as unknown as Timestamp,
      SessionCreatedAt: serverTimestamp(),
    };

    return setDoc(sessionRef, newSession);
  };

  static getSessions = ({
    instituteId,
    lastDoc,
    lmt,
  }: {
    instituteId: string;
    lmt?: number | null;
    lastDoc?: DocumentData | null;
  }) => {
    const sessionRef = collection(db, CollectionName.sessions);

    let queryParams: QueryConstraint[] = [
      where('SessionInstituteId', '==', instituteId),
      orderBy('SessionDate', 'desc'),
    ];

    if (lastDoc) {
      queryParams = [...queryParams, startAfter(lastDoc)];
    }

    if (lmt) {
      queryParams = [...queryParams, limit(lmt)];
    }
    const sessionQuery = query(sessionRef, ...queryParams);

    return getDocs(sessionQuery);
  };

  static deleteSession = (sessionId: string) => {
    const sessionRef = doc(db, CollectionName.sessions, sessionId);

    return deleteDoc(sessionRef);
  };
}

export default DbSession;
