import { queryClient } from '@/main';
import { getLessons } from '@/services/course';
import { getStoreValue } from '@/store/index';
import { Category } from '@/types/category';
import { useQuery } from '@tanstack/react-query';

export const useLessonsQuery = (schoolId: string, categoryId: string, courseId: string) =>
  useQuery(['lessons', courseId], getLessons(schoolId, categoryId, courseId), {
    cacheTime: Infinity,
    refetchOnWindowFocus: false,
    retry: 1,
    retryDelay: 200,
    useErrorBoundary: false,
    placeholderData: null,
  });

export const useLessons = (courseId: string) =>
  getStoreValue<Category[]>(['lessons', courseId]);

export const reloadLessons = async (courseId: string) => {
  queryClient.setQueryData(['lessons', courseId], null);
  await queryClient.resetQueries(['lessons', courseId]);
};
