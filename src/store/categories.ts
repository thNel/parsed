import { queryClient } from '@/main';
import { getCategories } from '@/services/course';
import { getStoreValue } from '@/store/index';
import { Category } from '@/types/category';
import { useQuery } from '@tanstack/react-query';

export const useCategoriesQuery = (schoolId: string) =>
  useQuery(['categories', schoolId], getCategories(schoolId), {
    cacheTime: Infinity,
    refetchOnWindowFocus: false,
    retry: 1,
    retryDelay: 200,
    useErrorBoundary: false,
    placeholderData: null,
  });

export const useCategories = (schoolId: string) =>
  getStoreValue<Category[]>(['categories', schoolId]);

export const reloadCategories = async (schoolId: string) => {
  queryClient.setQueryData(['categories', schoolId], null);
  await queryClient.resetQueries(['categories', schoolId]);
};
