import { create } from 'zustand';

interface IAuthUser {
  AuthUserAuthenticated: boolean;
  AuthUserRole: 'admin' | 'faculty' | 'student';
}

interface SessionState {
  component: string;
  setComponent: (component: string) => void;
  authUser: IAuthUser;
  setAuthUser: (authUser: IAuthUser) => void;
}

export const useSessionStore = create<SessionState>(set => ({
  component: 'Classroom',
  setComponent: (component: string) => set(state => ({ ...state, component })),
  authUser: { AuthUserAuthenticated: true, AuthUserRole: 'admin' },
  setAuthUser: data => set(state => ({ ...state, authUser: data })),
}));
