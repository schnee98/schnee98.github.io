/**
 * Application Layer: Theme Store
 * Zustand를 사용한 상태 관리 - 액션(Action)으로 분류
 * 테마 관련 상태 관리
 */

import { create } from 'zustand';
import { THEMES, type Theme } from '@/shared/constants/Theme';

interface ThemeState {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
}

export const useThemeStore = create<ThemeState>(set => ({
  theme: THEMES.LIGHT,
  toggleTheme: () =>
    set(state => ({
      theme: state.theme === THEMES.LIGHT ? THEMES.DARK : THEMES.LIGHT,
    })),
  setTheme: theme => set({ theme }),
}));
