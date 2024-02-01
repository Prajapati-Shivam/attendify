import { FieldValue, Timestamp } from "firebase/firestore";

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
