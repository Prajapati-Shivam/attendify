import type { FieldValue, Timestamp } from 'firebase/firestore';

export interface IAdminsCollection {
  AdminId: string;
  AdminFirstName?: string;
  AdminLastName?: string;
  AdminCountry?: string;
  AdminCountryCode?: string;
  AdminPhone: string;
  AdminEmail?: string;
  AdminInstituteName: string;
  AdminCreateTime: Timestamp | FieldValue;
  AdminNameChangeTime: Timestamp | FieldValue;
}

export interface IFacultiesCollection {
  FacultyId: string;
  FacultyFirstName?: string;
  FacultyLastName?: string;
  FacultyPhone: string;
  FacultyEmail?: string;
  FacultyCreateTime: Timestamp | FieldValue;
  FacultyNameChangeTime: Timestamp | FieldValue;
}

export interface ILoggedInUsersCollection {
  LoggedInId: string;
  LoggedInUserId: string;
  LoggedInCreatedAt: Timestamp | FieldValue;
  IsLoggedIn: boolean;
  LoggedInCrypt: string;
  LoggedInUserType: 'admin' | 'faculty' | 'student';
}
