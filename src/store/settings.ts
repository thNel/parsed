import { atom } from 'recoil';

export const lightThemeState = atom<boolean>({
  key: 'lightTheme',
  default: JSON.parse(localStorage.getItem('themeLight') ?? 'false'),
});
