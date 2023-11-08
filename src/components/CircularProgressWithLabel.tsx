import Box from '@mui/material/Box';
import CircularProgress, { CircularProgressProps } from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import { ReactElement } from 'react';

const CircularProgressWithLabel = ({
  text,
  ...props
}: { text: string } & CircularProgressProps): ReactElement => {
  return (
    <Box
      sx={{
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        aspectRatio: '1',
      }}
    >
      <CircularProgress
        {...props}
        sx={{
          position: 'absolute',
          height: 'calc(100% + 24px) !important',
          width: 'calc(100% + 24px) !important',
        }}
      />
      <Box
        sx={{
          display: 'flex',
          flex: '1 1 auto',
          height: '100%',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography variant="caption" component="div" color="text.secondary">
          {text}
        </Typography>
      </Box>
    </Box>
  );
};

export default CircularProgressWithLabel;