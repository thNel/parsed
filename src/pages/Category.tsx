import ErrorBoundary from '@/components/ErrorBoundary';
import Preloader from '@/components/Preloader';
import { noImageUrl } from '@/constants/other';
import { useCoursesQuery } from '@/store/courses';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { ReactElement } from 'react';
import { Link, useOutlet, useParams } from 'react-router-dom';

const Category = (): ReactElement => {
  const { schoolId, categoryId } = useParams();
  const Outlet = useOutlet();

  const {
    isError,
    isSuccess,
    isLoading,
    data: courses,
  } = useCoursesQuery(String(schoolId), String(categoryId));

  if (isLoading || courses === null) return <Preloader thickness={5} />;

  if (isError || courses.length < 1)
    return <ErrorBoundary manualMessage={'Не удалось загрузить категории'} />;

  if (Outlet && isSuccess) return Outlet;

  if (isSuccess) {
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '40px',
          alignItems: 'center',
          maxHeight: '100%',
          overflow: 'auto',
        }}
      >
        <Typography variant="h4">Курс</Typography>
        <Grid
          container
          sx={{
            gap: 2,
            justifyContent: 'center',
            maxHeight: '100%',
            overflow: 'auto',
            paddingTop: '8px',
            paddingBottom: '16px',
          }}
        >
          {courses
            // .sort((a, b) => a.title.length - b.title.length)
            .map((card) => (
              <Grid item key={card.id} sx={{ display: 'flex' }}>
                <Link
                  to={`/school/${schoolId}/category/${categoryId}/course/${card.id}`}
                  style={{ textDecoration: 'none' }}
                >
                  <Card
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      width: '280px',
                      height: '390px',
                      borderRadius: '3%',
                      flexGrow: 1,
                    }}
                  >
                    <CardMedia
                      component="div"
                      sx={{
                        aspectRatio: 1,
                        height: '100%',
                        width: '100%',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        flexGrow: 1,
                      }}
                      image={card.poster ?? noImageUrl}
                    />
                    <CardContent
                      sx={{
                        flexGrow: 1,
                        textAlign: 'center',
                        padding: '16px !important',
                      }}
                    >
                      <Typography variant="h5">{card.title}</Typography>
                    </CardContent>
                  </Card>
                </Link>
              </Grid>
            ))}
        </Grid>
      </Box>
    );
  }

  throw new Error('Неизвестная ошибка. Компонент <Category />');
};

export default Category;