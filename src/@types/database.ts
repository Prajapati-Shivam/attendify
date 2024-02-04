import type { FieldValue, Timestamp } from 'firebase/firestore';

export interface IAdminsCollection {
  AdminId: string;
  AdminFirstName?: string;
  AdminLastName?: string;
  AdminCountry?: string;
  AdminCountryCode?: string;
  AdminPhone: string;
  AdminEmail?: string;
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
