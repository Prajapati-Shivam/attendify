export enum CollectionName {
  admins = 'Admins',
  classes = 'Classes',
  students = 'Students',
  subjects = 'Subjects',
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
  SUBJECT_LIST: 20,
  CLASS_LIST: 20,
  STUDENT_LIST: 20,
} as const;

export const REACT_QUERY_KEYS = {
  COURSE_LIST: 'course-list',
  SUBJECT_LIST: 'subject-list',
  CLASS_LIST: 'class-list',
  STUDENT_LIST: 'student-list',
} as const;

export const MinimumQueryCharacter = {
  COURSE_LIST: 1,
  SUBJECT_LIST: 1,
  CLASS_LIST: 1,
  STUDENT_LIST: 1,
};
