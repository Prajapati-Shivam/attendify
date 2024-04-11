export enum CollectionName {
  admins = 'Admins',
  classes = 'Classes',
  students = 'Students',
  faculties = 'Faculties',
  lectures = 'Lectures',
  attendances = 'Attendances',
  loggedInUsers = 'LoggedInUsers',
  institute = 'Institute',
  courses = 'Courses',
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

export const DisplayCount = {
  COURSE_LIST: 20,
} as const;

export const REACT_QUERY_KEYS = {
  COURSE_LIST: 'course-list',
} as const;
