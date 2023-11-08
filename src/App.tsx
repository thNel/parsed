import ModalProvider, { ModalOptions } from '@/components/ModalProvider';
import { router } from '@/router';
import { lightThemeState } from '@/store/settings';
import { materialDarkThemeOptions as dark } from '@/themes/dark';
import { materialLightThemeOptions as light } from '@/themes/light';
import ModalUtils from '@/utils/modalUtils';
import ToastUtils from '@/utils/toastUtils';
import { CssBaseline } from '@mui/material';
import Container from '@mui/material/Container';
import { createTheme, THEME_ID, ThemeProvider } from '@mui/material/styles';
import { useSnackbar } from 'notistack';
import { ReactElement, useEffect, useState } from 'react';
import { RouterProvider } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

const materialLightTheme = createTheme(light);
const materialDarkTheme = createTheme(dark);

function App() {
  const isLightTheme = useRecoilValue(lightThemeState);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const [showModal, setShowModal] = useState(false);
  const [modalChild, setModalChild] = useState(<></>);
  const [modalOptions, setModalOptions] = useState<ModalOptions>({});
  const openModal = (component: ReactElement, options?: ModalOptions) => {
    setModalChild(component);
    setModalOptions(options ?? {});
    setShowModal(true);
  };
  const closeModal = () => {
    setShowModal(false);
    setModalChild(<></>);
  };

  useEffect(() => {
    ToastUtils.setSnackBar(enqueueSnackbar, closeSnackbar);
    ModalUtils.setup(openModal, closeModal);
  }, [closeSnackbar, enqueueSnackbar]);

  return (
    <ThemeProvider
      theme={{ [THEME_ID]: isLightTheme ? materialLightTheme : materialDarkTheme }}
    >
      <CssBaseline enableColorScheme />
      <Container
        maxWidth="xl"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          flex: '1 1 auto',
          paddingTop: '40px',
          paddingBottom: '40px',
          gap: '80px',
          maxHeight: '100%',
          overflow: 'auto',
        }}
      >
        <RouterProvider router={router} />
        <ModalProvider show={showModal} {...modalOptions}>
          {modalChild}
        </ModalProvider>
      </Container>
    </ThemeProvider>
  );
}

export default App;
