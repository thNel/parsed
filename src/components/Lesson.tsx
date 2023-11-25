import { getStoreValue } from '@/store';
import { LessonType, TLesson } from '@/types/lesson';
import Box from '@mui/material/Box';
import { ReactElement, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const Lesson = (): ReactElement => {
  const { courseId, lessonId } = useParams();
  const [lesson, setLesson] = useState<TLesson | null>(null);

  useEffect(() => {
    const lessons = getStoreValue<TLesson[]>(['lessons', courseId ?? 'none']);
    setLesson(lessons?.find((item) => String(item.id) === lessonId) ?? null);
  }, [courseId, lessonId]);

  return (
    <Box
      sx={{
        display: 'flex',
        flex: '1 1 auto',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {lesson?.type === LessonType.youtube ? (
        <iframe
          src={`https://www.youtube.com/embed/${lesson.url.replace(
            'https://youtu.be/',
            '',
          )}?color=white`}
          className={'video-frame'}
          allowFullScreen
        />
      ) : (
        'Для vimeo пока не реализовано'
      )}
    </Box>
  );
};

export default Lesson;