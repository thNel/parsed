import Preloader from '@/components/Preloader';
import { getVimeoVideo } from '@/services/course';
import { getStoreValue } from '@/store';
import { useSchools } from '@/store/schools';
import { LessonType, TLesson } from '@/types/lesson';
import Box from '@mui/material/Box';
import { ReactElement, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const Lesson = (): ReactElement => {
  const { courseId, lessonId, schoolId } = useParams();
  const schools = useSchools();
  const [lesson, setLesson] = useState<TLesson | null>(null);
  const [videoDoc, setVideoDoc] = useState<string>('default error document');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const lessons = getStoreValue<TLesson[]>(['lessons', courseId ?? 'none']);
    setLesson(lessons?.find((item) => String(item.id) === lessonId) ?? null);
  }, [courseId, lessonId]);

  useEffect(() => {
    if (lesson?.type === LessonType.vimeo) {
      setIsLoading(true);
      getVimeoVideo(
        lesson.url,
        schoolId && schools?.find((item) => item.id === parseInt(schoolId))?.rootUrl,
      ).then((doc) => {
        setVideoDoc(doc);
        setIsLoading(false);
      });
    }
  }, [lesson, schoolId, schools]);

  return (
    <Box
      sx={{
        display: 'flex',
        flex: '1 1 auto',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {isLoading ? (
        <Preloader />
      ) : (
        (() => {
          switch (lesson?.type) {
            case LessonType.youtube:
              return (
                <iframe
                  src={`https://www.youtube.com/embed/${lesson.url.replace(
                    'https://youtu.be/',
                    '',
                  )}?color=white`}
                  className={'video-frame'}
                  allowFullScreen
                />
              );

            case LessonType.vimeo:
              return (
                <iframe srcDoc={videoDoc} className={'video-frame'} allowFullScreen />
              );

            case LessonType.getcourse:
              return 'Ещё не реализовано для плеера GetCourse';

            default:
              return 'Неизвестный тип плеера';
          }
        })()
      )}
    </Box>
  );
};

export default Lesson;