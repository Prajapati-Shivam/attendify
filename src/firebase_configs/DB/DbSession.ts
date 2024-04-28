import type { Timestamp } from 'firebase/firestore';
import { doc, serverTimestamp, setDoc } from 'firebase/firestore';

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
}

export default DbSession;
