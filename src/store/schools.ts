import { queryClient } from '@/main';
import { getSchools } from '@/services/course';
import { getStoreValue } from '@/store/index';
import { School } from '@/types/school';
import { useQuery } from '@tanstack/react-query';

export const useSchoolsQuery = () =>
  useQuery(['schools'], getSchools, {
    cacheTime: Infinity,
    refetchOnWindowFocus: false,
    retry: 1,
    retryDelay: 200,
    useErrorBoundary: false,
    placeholderData: null,
  });

export const useSchools = () => getStoreValue<School[]>(['schools']);

export const reloadSchools = async () => {
  queryClient.setQueryData(['schools'], null);
  await queryClient.resetQueries(['schools']);
};
