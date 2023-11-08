import { Course } from '@/types/course';
import { School } from '@/types/school';

export type Category = {
  id: number;
  title: string;
  poster: string | null;
  hidden: boolean;
  school: School;
  courses?: Course[] | null;
};
