import { lightThemeState } from '@/store/settings';
import { materialDarkThemeOptions as dark } from '@/themes/dark';
import { materialLightThemeOptions as light } from '@/themes/light';
import { Box, CssBaseline } from '@mui/material';
import { createTheme, THEME_ID, ThemeProvider } from '@mui/material/styles';
import { ReactElement } from 'react';
import { Outlet } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

const materialLightTheme = createTheme(light);
const materialDarkTheme = createTheme(dark);

function App({ children }: { children?: ReactElement }) {
  const isLightTheme = useRecoilValue(lightThemeState);

  return (
    <ThemeProvider
      theme={{ [THEME_ID]: isLightTheme ? materialLightTheme : materialDarkTheme }}
    >
      <CssBaseline enableColorScheme />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
        }}
      >
        {children ? children : <Outlet />}
      </Box>
    </ThemeProvider>
  );
}

export default App;
