import ErrorBoundary from '@/components/ErrorBoundary';
import Preloader from '@/components/Preloader';
import { useLessonsQuery } from '@/store/lessons';
import { stringSort } from '@/utils/stringUtils';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import { ReactElement, useState } from 'react';
import { useLocation, useNavigate, useOutlet, useParams } from 'react-router-dom';

const Course = (): ReactElement => {
  const { schoolId, categoryId, courseId, lessonId } = useParams();
  const [selectedId, setSelectedId] = useState(parseInt(lessonId ?? '0') ?? 0);
  const Outlet = useOutlet();
  const location = useLocation();
  const redirect = useNavigate();

  const {
    isError,
    isSuccess,
    isLoading,
    data: lessons,
  } = useLessonsQuery(String(schoolId), String(categoryId), String(courseId));

  const handleListItemClick = (id: number) => {
    setSelectedId(id);
    const lessonSubStringIndex =
      location.pathname.indexOf('/lesson/') > -1
        ? location.pathname.indexOf('/lesson/')
        : undefined;
    const pathname = location.pathname.slice(0, lessonSubStringIndex) + `/lesson/${id}`;
    redirect({ pathname });
  };

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
            justifyContent: 'space-evenly',
            gap: '80px',
            width: '100%',
            maxHeight: '100%',
            overflow: 'auto',
          }}
        >
          <List
            component="nav"
            aria-label="main mailbox folders"
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
              ))}
          </List>
          <Box sx={{ flex: '1 1 auto', display: 'flex' }}>
            {Outlet || 'Выбери сначала'}
          </Box>
        </Box>
      </Box>
    );

  throw new Error('Неизвестная ошибка. Компонент <Course />');
};

export default Course;