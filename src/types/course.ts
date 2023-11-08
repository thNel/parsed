import { Category } from '@/types/category';
import { TLesson } from '@/types/lesson';
import { School } from '@/types/school';

export type Course = {
  id: number;
  externalId: string;
  title: string;
  poster: string | null;
  hidden: boolean;
  school: School;
  category: Category | null;
  lessons: TLesson[] | null;
};
