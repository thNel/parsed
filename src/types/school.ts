import { Category } from '@/types/category';
import { Course } from '@/types/course';

export type School = {
  id: number;
  title: string;
  rootUrl: string;
  poster: string | null;
  hidden: boolean;
  courses?: Course[] | null;
  categories?: Category[] | null;
};
