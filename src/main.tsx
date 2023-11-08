import App from '@/App';
import DebugObserver from '@/components/DebugObserver';
import { ComponentPreviews, useInitial } from '@/dev';
import '@/main.css';
import { DevSupport } from '@react-buddy/ide-toolbox';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import axios from 'axios';
import { SnackbarProvider } from 'notistack';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RecoilRoot } from 'recoil';

axios.defaults.withCredentials = true;
export const queryClient = new QueryClient();

const root = createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <StrictMode>
    <RecoilRoot>
      <DebugObserver />
      <QueryClientProvider client={queryClient}>
        <SnackbarProvider maxSnack={3}>
          <DevSupport ComponentPreviews={ComponentPreviews} useInitialHook={useInitial}>
            <App />
          </DevSupport>
        </SnackbarProvider>
        {import.meta.env.MODE === 'development' ? (
          <ReactQueryDevtools initialIsOpen={false} />
        ) : null}
      </QueryClientProvider>
    </RecoilRoot>
  </StrictMode>,
);
