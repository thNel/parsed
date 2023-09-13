import { ComponentPreviews, useInitial } from '@/dev';
import { router } from '@/router';
import { DevSupport } from '@react-buddy/ide-toolbox';
import axios from 'axios';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { RecoilRoot } from 'recoil';

axios.defaults.withCredentials = true;

createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <RecoilRoot>
      <DevSupport ComponentPreviews={ComponentPreviews} useInitialHook={useInitial}>
        <RouterProvider router={router} />
      </DevSupport>
    </RecoilRoot>
  </StrictMode>,
);
