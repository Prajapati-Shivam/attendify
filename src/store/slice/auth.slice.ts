import type { StateCreator } from 'zustand';

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
});
