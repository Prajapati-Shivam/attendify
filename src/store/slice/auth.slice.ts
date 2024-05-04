import type { StateCreator } from 'zustand';

import type {
  IAdminsCollection,
  IInstitutesCollection,
  ILoggedInUsersCollection,
  IStudentsCollection,
} from '@/@types/database';
import { LocalStorageKey } from '@/@types/enum';
import DbUser from '@/firebase_configs/DB/DbUser';
import * as storage from '@/lib/Storage';

interface IAuthUser {
  AuthUserAuthenticated: boolean;
  AuthUserRole: 'admin' | 'faculty' | 'student';
  AuthUserId: string;
}

interface AuthState {
  authUser: IAuthUser;
  setAuthUser: (authUser: IAuthUser) => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  userSignOut: () => void;
  admin: IAdminsCollection | null;
  setAdmin: (admin: IAdminsCollection) => void;
  student: IStudentsCollection | null;
  setStudent: (student: IStudentsCollection) => void;
  institute: IInstitutesCollection | null;
  setInstitute: (admin: IInstitutesCollection) => void;
}

export const createAuthSlice: StateCreator<AuthState> = set => ({
  authUser: {
    AuthUserAuthenticated: false,
    AuthUserRole: 'admin',
    AuthUserId: '',
  },
  setAuthUser: data => set(state => ({ ...state, authUser: data })),
  isLoading: true,
  setIsLoading: loading => set(state => ({ ...state, isLoading: loading })),
  admin: null,
  setAdmin: admin => set(state => ({ ...state, admin })),
  student: null,
  setStudent: student => set(state => ({ ...state, student })),
  institute: null,
  setInstitute: institute => set(state => ({ ...state, institute })),

  // For logging out user
  userSignOut: () => {
    const loggedInUser: ILoggedInUsersCollection | null = storage.getJson(
      LocalStorageKey.LOGGEDIN_USER,
    );

    if (loggedInUser) {
      set(state => ({
        ...state,
        authUser: {
          AuthUserAuthenticated: false,
          AuthUserId: '',
          AuthUserRole: 'admin',
        },
      }));
      DbUser.deleteUserLoggedInDoc(loggedInUser.LoggedInId)
        .then(() => {
          storage.clear(LocalStorageKey.LOGGEDIN_USER);
        })
        .catch(error => {
          // eslint-disable-next-line no-console
          console.log(error);
        });
    }
  },
});
