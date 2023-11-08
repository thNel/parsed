import { PropsWithChildren, ReactElement } from 'react';
import ModalUtils from '@/utils/modalUtils';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';

export type ModalOptions = {
  title?: string;
  closable?: boolean;
};

type IProps = ModalOptions & {
  show: boolean;
};

const ModalProvider = ({
  show,
  title,
  closable = true,
  children,
}: PropsWithChildren<IProps>): ReactElement => {
  return (
    <Modal
      open={show}
      disableAutoFocus
      onClose={closable ? ModalUtils.closeModal : undefined}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Box
        sx={{
          minWidth: '320px',
          minHeight: '240px',
          maxWidth: 'min-content',
          display: 'flex',
          flexDirection: 'column',
          flex: '1 1 auto',
          backgroundColor: 'rgba(127,255,227,0.06)',
          borderRadius: '12px',
        }}
      >
        {(title || closable) && (
          <Box
            id="modal-title"
            sx={{
              display: 'flex',
              width: '100%',
              justifyContent: 'center',
              alignItems: 'center',
              position: 'relative',
            }}
          >
            {title && (
              <Box
                id="modal-title"
                sx={{
                  display: 'flex',
                  flex: '1 1 auto',
                  justifyContent: 'center',
                  alignItems: 'start',
                  pl: '44px',
                  pr: '44px',
                  mb: '16px',
                }}
              >
                <Typography variant="h6" component="h2">
                  {title}
                </Typography>
              </Box>
            )}
            {closable && (
              <Box
                sx={{
                  position: 'absolute',
                  top: 0,
                  display: 'flex',
                  justifyContent: 'end',
                  width: '100%',
                }}
              >
                <CloseIcon
                  onClick={ModalUtils.closeModal}
                  sx={{
                    mt: '4px',
                    mr: '4px',
                    cursor: 'pointer',
                  }}
                />
              </Box>
            )}
          </Box>
        )}
        <Box
          id="modal-description"
          sx={{
            display: 'flex',
            flexDirection: 'column',
            flex: '1 1 auto',
            minWidth: '100%',
            width: 'max-content',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '8px',
            pb: title ? '28px' : '8px',
          }}
        >
          {children}
        </Box>
      </Box>
    </Modal>
  );
};

export default ModalProvider;
