import { isServerMessage } from '@/types/server';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { ReactElement } from 'react';
import { isRouteErrorResponse, useRouteError } from 'react-router-dom';

const ErrorBoundary = ({ manualMessage }: { manualMessage?: string }): ReactElement => {
  const error = useRouteError() as { message?: string };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        flex: '1 1 auto',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Typography variant="h2" gutterBottom component="h1">
        Что-то пошло не так...
      </Typography>
      <Typography variant="h5" gutterBottom>
        <i>
          <>
            {isRouteErrorResponse(error) && `${error?.status}. ${error?.statusText}`}
            {isServerMessage(error) && error.message}
            {manualMessage}
          </>
        </i>
      </Typography>
    </Box>
  );
};

export default ErrorBoundary;
