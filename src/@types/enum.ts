export enum CollectionName {
  admins = 'Admins',
  classes = 'Classes',
  students = 'Students',
  faculties = 'Faculties',
  lectures = 'Lectures',
  attendances = 'Attendances',
  loggedInUsers = 'LoggedInUsers',
  institute = 'Institute',
}

export const LocalStorageKey = {
  LOGGEDIN_USER: 'loggedInUser',
};

export enum AuthUserType {
  admin = 'Admin',
  faculty = 'Faculty',
  student = 'Student',
}
export interface LocalStorageLoggedInUserData {
  LoggedInId: string;
  LoggedInCrypt: string;
  LoggedInAuthUserType: 'admin' | 'faculty' | 'student';
}
