import { ReactElement } from 'react';
import Box from '@mui/material/Box';
import CircularProgressWithLabel from '@/components/CircularProgressWithLabel';
import { CircularProgressProps } from '@mui/material/CircularProgress';

const Preloader = ({
  text,
  ...props
}: { text?: string } & CircularProgressProps): ReactElement => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        flex: '1 1 auto',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
      }}
    >
      <CircularProgressWithLabel text={text ?? 'Загрузка'} {...props} />
    </Box>
  );
};

export default Preloader;