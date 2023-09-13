import { Box, Typography } from '@mui/material';
import { isRouteErrorResponse, useRouteError } from 'react-router-dom';

const Error = () => {
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
      <Typography variant="h1" gutterBottom component="h1">
        Что-то пошло не так...
      </Typography>
      <Typography variant="body1" gutterBottom>
        Извините, произошла непредвиденная ошибка.
      </Typography>
      <Typography variant="caption" gutterBottom>
        <i>
          <>
            {isRouteErrorResponse(error)
              ? `${error?.status}. ${error?.statusText}`
              : error?.message || error}
          </>
        </i>
      </Typography>
    </Box>
  );
};

export default Error;
