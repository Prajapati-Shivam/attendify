import { create } from 'zustand';

import { createAuthSlice } from './slice/auth.slice';
import { createUISlice } from './slice/ui.slice';

export const useSessionStore = create(createAuthSlice);

export const useUIStore = create(createUISlice);
