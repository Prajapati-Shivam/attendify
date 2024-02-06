import type { StateCreator } from 'zustand';

import type { ILoggedInUsersCollection } from '@/@types/database';
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
  userSignOut: () => {
    const loggedInUser: ILoggedInUsersCollection | null = storage.getJson(
      LocalStorageKey.LOGGEDIN_USER,
    );

    if (loggedInUser) {
      set(state => ({ state, isLoading: true }));
      DbUser.deleteUserLoggedInDoc(loggedInUser.LoggedInId)
        .then(() => {
          storage.clear(LocalStorageKey.LOGGEDIN_USER);
          set(state => ({
            ...state,
            isLoading: false,
            authUser: {
              AuthUserAuthenticated: false,
              AuthUserId: '',
              AuthUserRole: 'admin',
            },
          }));
        })
        .catch(error => {
          // eslint-disable-next-line no-console
          console.log(error);
          set(state => ({ state, isLoading: true }));
        });
    }
  },
});
