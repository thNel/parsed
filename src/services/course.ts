import { Category } from '@/types/category';
import { Course } from '@/types/course';
import { TLesson } from '@/types/lesson';
import { School } from '@/types/school';
import { isServerMessage, ServerMessage } from '@/types/server';
import ToastUtils from '@/utils/toastUtils';
import axios from 'axios';

const section = '/api/v1/course';

export const getSchools = async (): Promise<School[]> => {
  const { data: schools } = await axios.get<School[] | ServerMessage>('/', {
    baseURL: section,
  });
  if (isServerMessage(schools)) {
    if (schools.success) {
      ToastUtils.success(schools.message);
    } else if (schools.error) {
      ToastUtils.error(schools.message);
    } else ToastUtils.toast(schools.message);
    return [];
  }
  return schools;
};
export const getCategories = (schoolId: string) => async (): Promise<Category[]> => {
  const { data: categories } = await axios.get<Category[] | ServerMessage>(
    `/${schoolId}`,
    { baseURL: section },
  );
  if (isServerMessage(categories)) {
    if (categories.success) {
      ToastUtils.success(categories.message);
    } else if (categories.error) {
      ToastUtils.error(categories.message);
    } else ToastUtils.toast(categories.message);
    return [];
  }
  return categories;
};

export const getCourses =
  (schoolId: string, categoryId: string) => async (): Promise<Course[]> => {
    const { data: courses } = await axios.get<Course[] | ServerMessage>(
      `/${schoolId}/${categoryId === 'none' ? -1 : categoryId}`,
      { baseURL: section },
    );
    if (isServerMessage(courses)) {
      if (courses.success) {
        ToastUtils.success(courses.message);
      } else if (courses.error) {
        ToastUtils.error(courses.message);
      } else ToastUtils.toast(courses.message);
      return [];
    }
    return courses;
  };

export const getLessons =
  (schoolId: string, categoryId: string, courseId: string) =>
  async (): Promise<TLesson[]> => {
    const { data: lessons } = await axios.get<TLesson[] | ServerMessage>(
      `/${schoolId}/${categoryId === 'none' ? -1 : categoryId}/${courseId}`,
      { baseURL: section },
    );
    if (isServerMessage(lessons)) {
      if (lessons.success) {
        ToastUtils.success(lessons.message);
      } else if (lessons.error) {
        ToastUtils.error(lessons.message);
      } else ToastUtils.toast(lessons.message);
      return [];
    }
    return lessons;
  };

export const getVimeoVideo = async (url: string, referer?: string): Promise<string> => {
  const {
    data: { message, error, success },
  } = await axios.post<ServerMessage>(
    '/getVimeoVideo',
    {
      url,
      config: referer ? { headers: { Referer: referer } } : undefined,
    },
    { baseURL: section },
  );
  if (success) {
    return message;
  }
  if (error) {
    ToastUtils.error(message);
  } else {
    ToastUtils.toast(message);
  }
  return 'default error document';
};

