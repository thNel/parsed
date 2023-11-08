import { Course } from '@/types/course';

export enum LessonType {
  youtube,
  getcourse,
  vimeo,
}

type ExtraData = {
  description?: string;
  extraVideos?: { title: string; url: string; type: LessonType }[];
  extraImages?: { title: string; url: string }[];
};

export type TLesson = {
  id: number;
  title: string;
  url: string;
  hidden: string;
  type: LessonType;
  extraData: ExtraData;
  course: Course;
};
