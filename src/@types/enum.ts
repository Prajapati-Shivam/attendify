export enum CollectionName {
  users = 'Users',
  classes = 'Classes',
  students = 'Students',
  faculties = 'Faculties',
  lectures = 'Lectures',
  attendances = 'Attendances',
}

export const LocalStorageKey = {
  LOGGEDIN_USER: 'loggedInUser',
};

export enum AuthUserType {
  admin = 'Admin',
  faculty = 'Faculty',
  student = 'Student',
}
