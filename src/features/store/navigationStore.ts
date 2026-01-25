/**
 * Application Layer: Navigation Store
 * 네비게이션 메뉴 상태 관리 (모바일 메뉴 열림/닫힘)
 */

import { create } from 'zustand';

interface NavigationState {
  isMenuOpen: boolean;
  toggleMenu: () => void;
  closeMenu: () => void;
}

export const useNavigationStore = create<NavigationState>((set) => ({
  isMenuOpen: false,
  toggleMenu: () => set((state) => ({ isMenuOpen: !state.isMenuOpen })),
  closeMenu: () => set({ isMenuOpen: false }),
}));

