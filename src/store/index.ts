import { queryClient } from '@/main';

export const getStoreValue = <T>(key: string[]): T | undefined =>
  queryClient.getQueryData<T>(key);
