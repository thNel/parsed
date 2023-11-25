import ErrorBoundary from '@/components/ErrorBoundary';
import Preloader from '@/components/Preloader';
import { useLessonsQuery } from '@/store/lessons';
import { stringSort } from '@/utils/stringUtils';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import { ReactElement, useCallback, useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate, useOutlet, useParams } from 'react-router-dom';

const Course = (): ReactElement => {
  const { schoolId, categoryId, courseId, lessonId } = useParams();
  const Outlet = useOutlet();
  const location = useLocation();
  const redirect = useNavigate();
  const lessonVideoRef = useRef<HTMLDivElement | null>(null);
  const lessonListRef = useRef<HTMLDivElement | null>(null);
  const {
    isError,
    isSuccess,
    isLoading,
    data: lessons,
  } = useLessonsQuery(String(schoolId), String(categoryId), String(courseId));

  const [selectedId, setSelectedId] = useState(parseInt(lessonId ?? '0') ?? 0);
  const [listWidth, setListWidth] = useState(0);
  const [compactMode, setCompactMode] = useState(false);

  const handleListItemClick = useCallback(
    (id: number) => {
      setSelectedId(id);
      const lessonSubStringIndex = location.pathname.indexOf('/lesson/');
      const pathname = (
        location.pathname.slice(
          0,
          lessonSubStringIndex > 0 ? lessonSubStringIndex : undefined,
        ) + `/lesson/${id}`
      ).replaceAll('//', '/');
      redirect({ pathname });
    },
    [location, redirect],
  );

  const checkVideoBoxWidth = useCallback(() => {
    if (lessons?.length && lessonVideoRef.current) {
      if (lessonVideoRef.current.offsetWidth < 720) {
        setCompactMode(true);
      }
      if (listWidth > 0 && lessonVideoRef.current.offsetWidth - listWidth > 800) {
        setCompactMode(false);
      }
    }
  }, [lessons, listWidth]);

  useEffect(() => {
    const updateSize = () => {
      checkVideoBoxWidth();
    };
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, [checkVideoBoxWidth]);

  useEffect(() => {
    if (isSuccess && lessons?.length && !lessonId) {
      handleListItemClick(lessons[0].id);
    }
    if (isSuccess && lessons?.length && lessonId) {
      if (lessonListRef.current) {
        setListWidth(lessonListRef.current.offsetWidth);
      }
      checkVideoBoxWidth();
    }
  }, [checkVideoBoxWidth, handleListItemClick, isSuccess, lessonId, lessons]);

  if (isLoading || lessons === null) return <Preloader thickness={5} />;

  if (isError || lessons.length < 1)
    return <ErrorBoundary manualMessage={'Не удалось загрузить категории'} />;
  if (isSuccess)
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '40px',
          alignItems: 'center',
          flex: '1 1 auto',
          maxHeight: '100%',
          overflow: 'auto',
        }}
      >
        <Typography variant="h4">Видеоуроки</Typography>
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-evenly',
            gap: `80px`,
            width: '100%',
            maxHeight: '100%',
            overflow: 'auto',
          }}
        >
          {compactMode ? (
            <Box
              sx={{
                display: 'flex',
                width: '100%',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <FormControl sx={{ marginTop: '10px' }}>
                <InputLabel id="lesson-selector-label">Урок</InputLabel>
                <Select
                  labelId="lesson-selector-label"
                  id="lesson-selector"
                  value={selectedId}
                  label="Урок"
                  onChange={(event) => handleListItemClick(+event.target.value)}
                >
                  {lessons
                    ?.sort((a, b) => stringSort(a.title, b.title))
                    .map((item) => (
                      <MenuItem key={item.id} value={item.id}>
                        {item.title}
                      </MenuItem>
                    )) ?? <MenuItem value={0}>Увы, уроков не найдено...</MenuItem>}
                </Select>
              </FormControl>
            </Box>
          ) : (
            <List
              component="div"
              ref={lessonListRef}
              sx={{
                width: 'auto',
                maxWidth: 460,
                backgroundColor: 'background.paper',
                maxHeight: '100%',
                overflow: 'auto',
              }}
            >
              {lessons
                ?.sort((a, b) => stringSort(a.title, b.title))
                .map((item) => (
                  <ListItemButton
                    key={item.id}
                    selected={selectedId === item.id}
                    onClick={() => handleListItemClick(item.id)}
                  >
                    <ListItemText primary={item.title} />
                  </ListItemButton>
                )) ?? 'Увы, уроков не найдено...'}
            </List>
          )}

          <Box sx={{ flex: '1 1 auto', display: 'flex' }} ref={lessonVideoRef}>
            {Outlet ?? 'Выбери сначала...'}
          </Box>
        </Box>
      </Box>
    );

  throw new Error('Неизвестная ошибка. Компонент <Course />');
};

export default Course;