import { create } from 'zustand';

interface IAuthUser {
  AuthUserAuthenticated: boolean;
  AuthUserRole: 'admin' | 'faculty' | 'student';
  AuthUserId: string;
}

interface SessionState {
  authUser: IAuthUser;
  setAuthUser: (authUser: IAuthUser) => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
}

export const useSessionStore = create<SessionState>(set => ({
  authUser: {
    AuthUserAuthenticated: false,
    AuthUserRole: 'admin',
    AuthUserId: '',
  },
  setAuthUser: data => set(state => ({ ...state, authUser: data })),
  isLoading: true,
  setIsLoading: loading => set(state => ({ ...state, isLoading: loading })),
}));
