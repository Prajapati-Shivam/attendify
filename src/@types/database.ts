import type { FieldValue, Timestamp } from 'firebase/firestore';

export interface IAdminsCollection {
  AdminId: string;
  AdminFirstName?: string;
  AdminLastName?: string;
  AdminPhone: string;
  AdminEmail?: string;
  AdminCreateTime: Timestamp | FieldValue;
  AdminNameChangeTime: Timestamp | FieldValue;
}

export interface IFacultiesCollection {
  FacultyId: string;
  FacultyFirstName: string;
  FacultyLastName: string;
  FacultyPhone: string;
  FacultyEmail: string;
  FacultyInstituteId: string;
  FacultyCreateTime: Timestamp | FieldValue;
  FacultyNameChangeTime: Timestamp | FieldValue;
}

export interface ICoursesCollection {
  CourseId: string;
  CourseFullName: string;
  CourseShortName: string;
  CourseCreatedAt: Timestamp | FieldValue;
}

export interface IStudentsCollection {
  StudentId: string;
  StudentFullName: string;
  StudentPhone: string;
  StudentEmail: string;
  StudentUniqueId: string;
  StudentRollNo: string;
  StudentCourseId: string;
  StudentCourseName: string;
  StudentCourseStartYear: Timestamp | FieldValue; //* remove time from this date
  StudentCourseEndYear: Timestamp | FieldValue; //* remove time from this date
  StudentInstituteId: string;
  StudentInstituteName: string;
  StudentCreateTime: Timestamp | FieldValue;
  StudentNameChangeTime: Timestamp | FieldValue;
}

export interface IInstitutesCollection {
  InstituteId: string;
  InstituteName: string;
  InstituteAddress: string;
  InstitutePhone: string;
  InstituteEmail?: string;
  InstituteWebsite?: string;
  InstituteAddedAt: Timestamp | FieldValue;
}

export interface IClassesCollection {
  ClassId: string;
  ClassName: string;
  ClassAcademicStartYear: Timestamp | FieldValue;
  ClassAcademicEndYear: Timestamp | FieldValue;
  ClassBatchCount: number;
  ClassStudentsCount: number;
  ClassCreatedAt: Timestamp | FieldValue;
}

export interface IBatchesCollection {
  BatchId: string;
  BatchName: string;
  BatchClassId: string;
  BatchClassName: string;
  BatchAcademicStartYear: Timestamp | FieldValue; //* will be same as Class academic year
  BatchAcademicEndYear: Timestamp | FieldValue; //* will be same as Class academic year
  BatchStudentsCount: number;
  BatchCreatedAt: Timestamp | FieldValue;
}

export interface ILoggedInUsersCollection {
  LoggedInId: string;
  LoggedInUserId: string;
  LoggedInCreatedAt: Timestamp | FieldValue;
  IsLoggedIn: boolean;
  LoggedInCrypt: string;
  LoggedInUserType: 'admin' | 'faculty' | 'student';
}
