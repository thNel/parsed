import ErrorBoundary from '@/components/ErrorBoundary';
import Lesson from '@/components/Lesson';
import Category from '@/pages/Category';
import Course from '@/pages/Course';
import Main from '@/pages/Main';
import School from '@/pages/School';
import { createBrowserRouter } from 'react-router-dom';

export const router = createBrowserRouter(
  [
    {
      id: 'main',
      path: '/',
      Component: Main,
      ErrorBoundary,
      handle: { crumbTitle: 'Школы' },
      children: [
        {
          id: 'school',
          path: 'school/:schoolId',
          Component: School,
          ErrorBoundary,
          handle: {
            crumbTitle: 'auto',
            storeKey: ['schools'],
            paramsKey: 'schoolId',
          },
          children: [
            {
              id: 'category',
              path: 'category/:categoryId',
              Component: Category,
              ErrorBoundary,
              handle: {
                crumbTitle: 'auto',
                storeKey: ['categories', ':schoolId'],
                paramsKey: 'categoryId',
              },
              children: [
                {
                  id: 'course',
                  path: 'course/:courseId',
                  Component: Course,
                  ErrorBoundary,
                  handle: {
                    crumbTitle: 'auto',
                    storeKey: ['courses', ':schoolId', ':categoryId'],
                    paramsKey: 'courseId',
                  },
                  children: [
                    {
                      id: 'lesson',
                      path: 'lesson/:lessonId',
                      Component: Lesson,
                      ErrorBoundary,
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  ],
  {},
);
