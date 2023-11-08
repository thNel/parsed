import { queryClient } from '@/main';
import { getCourses } from '@/services/course';
import { getStoreValue } from '@/store/index';
import { Category } from '@/types/category';
import { useQuery } from '@tanstack/react-query';

export const useCoursesQuery = (schoolId: string, categoryId: string) =>
  useQuery(['courses', schoolId, categoryId], getCourses(schoolId, categoryId), {
    cacheTime: Infinity,
    refetchOnWindowFocus: false,
    retry: 1,
    retryDelay: 200,
    useErrorBoundary: false,
    placeholderData: null,
  });

export const useCourses = (schoolId: string, categoryId: string) =>
  getStoreValue<Category[]>(['courses', schoolId, categoryId]);

export const reloadCourses = async (schoolId: string, categoryId: string) => {
  queryClient.setQueryData(['courses', schoolId, categoryId], null);
  await queryClient.resetQueries(['courses', schoolId, categoryId]);
};
