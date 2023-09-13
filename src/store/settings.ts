import { atom } from 'recoil';

export const lightThemeState = atom<boolean>({
  key: 'lightTheme',
  default: false,
});
