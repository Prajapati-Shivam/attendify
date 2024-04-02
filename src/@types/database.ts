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

export interface IInstitutesCollection {
  InstituteId: string;
  InstituteName: string;
  InstituteAddress: string;
  InstituteAdminId: string;
  InstitutePhone: string;
  InstituteEmail?: string;
  InstituteWebsite?: string;
  InstituteAddedAt: Timestamp | FieldValue;
}

export interface IFacultiesCollection {
  FacultyId: string;
  FacultyFirstName: string;
  FacultyLastName: string;
  FacultyNameSearchIndex: string[];
  FacultyPhone: string;
  FacultyEmail: string; //* This will be used by faculty to login
  FacultyPassword: string; //* This will be used by faculty to login
  FacultyInstituteId: string;
  FacultyCreateTime: Timestamp | FieldValue;
  FacultyNameChangeTime: Timestamp | FieldValue;
}

export interface ICoursesCollection {
  CourseId: string;
  CourseInstituteId: string;
  CourseFullName: string;
  CourseShortName: string;
  CourseCreatedAt: Timestamp | FieldValue;
}

export interface IStudentsCollection {
  StudentId: string;
  StudentFullName: string;
  StudentPhone: string;
  StudentEmail: string; //* This will be used by student to login
  StudentPassword: string; //* This will be used by student to login
  StudentUniqueId: string;
  StudentRollNo: string;
  StudentCourseId: string;
  StudentCourseName: string;
  StudentClassId: string;
  StudentClassArmId: string | null;
  StudentCourseStartYear: Timestamp | FieldValue; //* remove time from this date
  StudentCourseEndYear: Timestamp | FieldValue; //* remove time from this date
  StudentInstituteId: string;
  StudentInstituteName: string;
  StudentCreateTime: Timestamp | FieldValue;
  StudentNameChangeTime: Timestamp | FieldValue;
}

export interface IClassesCollection {
  ClassId: string;
  ClassInstituteId: string;
  ClassName: string;
  ClassAcademicStartYear: Timestamp | FieldValue;
  ClassAcademicEndYear: Timestamp | FieldValue;
  ClassArmCount: number;
  ClassStudentsCount: number;
  ClassCreatedAt: Timestamp | FieldValue;
}

export interface IClassArmsCollection {
  ClassArmId: string;
  ClassArmName: string;
  ClassArmClassId: string;
  ClassArmClassName: string;
  ClassArmAcademicStartYear: Timestamp | FieldValue; //* will be same as Class academic year
  ClassArmAcademicEndYear: Timestamp | FieldValue; //* will be same as Class academic year
  ClassArmStudentsCount: number;
  ClassArmCreatedAt: Timestamp | FieldValue;
}

export interface ISubjectsCollection {
  SubjectId: string;
  SubjectClassId: string;
  SubjectName: string;
  SubjectCreatedAt: Timestamp | FieldValue;
}

export interface ILoggedInUsersCollection {
  LoggedInId: string;
  LoggedInUserId: string;
  LoggedInCreatedAt: Timestamp | FieldValue;
  IsLoggedIn: boolean;
  LoggedInCrypt: string;
  LoggedInUserType: 'admin' | 'faculty' | 'student';
}
