import dayjs from 'dayjs';
import type {
  DocumentData,
  QueryConstraint,
  Timestamp,
} from 'firebase/firestore';
import {
  collection,
  deleteDoc,
  doc,
  GeoPoint,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  runTransaction,
  serverTimestamp,
  setDoc,
  startAfter,
  updateDoc,
  where,
} from 'firebase/firestore';

import type {
  IAttendanceCollection,
  IClassesCollection,
  ISessionsCollection,
} from '@/@types/database';
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

  static generateAttendanceSheet = async ({
    location,
    classId,
    instituteId,
    sessionId,
    facultyId,
    subjectId,
  }: {
    location: { lat: number; lng: number };
    instituteId: string;
    classId: string;
    sessionId: string;
    facultyId: string;
    subjectId: string;
  }) => {
    await runTransaction(db, async transaction => {
      const attendanceId = getNewDocId(CollectionName.attendances);

      const attendanceRef = doc(db, CollectionName.attendances, attendanceId);

      const classRef = doc(db, CollectionName.classes, classId);
      const classSnapshot = await transaction.get(classRef);
      const classData = classSnapshot.data() as IClassesCollection;

      const newAttendance: IAttendanceCollection = {
        AttendanceId: attendanceId,
        AttendanceInstituteId: instituteId,
        AttendanceSessionId: sessionId,
        AttendanceLocation: new GeoPoint(location.lat, location.lng),
        AttendancePresentStudentList: [],
        AttendanceTotalStudents: classData.ClassStudentsCount,
        AttendanceClassId: classId,
        AttendanceFacultyId: facultyId,
        AttendanceSubjectId: subjectId,
        AttendanceStatus: 'pending',
        AttendanceCreatedAt: serverTimestamp(),
        AttendanceModifiedAt: serverTimestamp(),
      };

      const sessionRef = doc(db, CollectionName.sessions, sessionId);

      transaction.update(sessionRef, {
        SessionIsAttendanceSheetGenerated: true,
      });

      transaction.set(attendanceRef, newAttendance);
    });
  };

  static getAttendanceSheets = ({
    instituteId,
    lastDoc,
    lmt,
    classId,
    subjectId,
    endDate,
    isLifeTime,
    startDate,
  }: {
    instituteId: string;
    lmt?: number | null;
    lastDoc?: DocumentData | null;
    classId?: string | null;
    subjectId?: string | null;
    startDate?: Date | null;
    endDate?: Date | null;
    isLifeTime?: boolean;
  }) => {
    const attendanceRef = collection(db, CollectionName.attendances);

    let queryParams: QueryConstraint[] = [
      where('AttendanceInstituteId', '==', instituteId),
      orderBy('AttendanceCreatedAt', 'desc'),
    ];

    if (classId) {
      queryParams = [...queryParams, where('AttendanceClassId', '==', classId)];
    }

    if (subjectId) {
      queryParams = [
        ...queryParams,
        where('AttendanceSubjectId', '==', subjectId),
      ];
    }

    if (!isLifeTime) {
      queryParams = [
        ...queryParams,
        where(
          'AttendanceCreatedAt',
          '>=',
          dayjs(startDate).startOf('day').toDate(),
        ),
        where(
          'AttendanceCreatedAt',
          '<=',
          dayjs(endDate).endOf('day').toDate(),
        ),
      ];
    }

    if (lastDoc) {
      queryParams = [...queryParams, startAfter(lastDoc)];
    }

    if (lmt) {
      queryParams = [...queryParams, limit(lmt)];
    }
    const attendanceQuery = query(attendanceRef, ...queryParams);

    return getDocs(attendanceQuery);
  };

  static getAttendanceSheetById = (attendanceId: string) => {
    const docRef = doc(db, CollectionName.attendances, attendanceId);
    return getDoc(docRef);
  };

  static submitAttendance = (attendanceId: string) => {
    const attendanceRef = doc(db, CollectionName.attendances, attendanceId);

    return updateDoc(attendanceRef, {
      AttendanceStatus: 'completed',
    } as Partial<IAttendanceCollection>);
  };
}

export default DbSession;
