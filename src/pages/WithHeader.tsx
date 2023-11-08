import Header from '@/components/Header';
import Box from '@mui/material/Box';
import { ReactElement, ReactNode } from 'react';

export const withHeader = (wrappedComponent: ReactNode): ReactElement => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        flex: '1 1 auto',
        maxHeight: '100%',
        overflow: 'auto',
        paddingTop: '8px',
        paddingBottom: '16px',
      }}
    >
      <Header />
      {wrappedComponent}
    </Box>
  );
};