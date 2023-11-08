import ErrorBoundary from '@/components/ErrorBoundary';
import Preloader from '@/components/Preloader';
import { noImageUrl } from '@/constants/other';
import { withHeader } from '@/pages/WithHeader';
import { useSchoolsQuery } from '@/store/schools';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { ReactElement } from 'react';
import { Link, useOutlet } from 'react-router-dom';

const Main = (): ReactElement => {
  const { isError, isSuccess, isLoading, data: schools } = useSchoolsQuery();
  const Outlet = useOutlet();

  if (isLoading || schools === null) return <Preloader thickness={5} />;

  if (isError || schools.length < 1)
    return <ErrorBoundary manualMessage={'Не удалось загрузить школы'} />;

  if (Outlet && isSuccess) return withHeader(Outlet);

  if (isSuccess)
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
        <Typography variant="h4">Выбор школы</Typography>
        <Grid
          container
          sx={{
            gap: 4,
            justifyContent: 'center',
            maxHeight: '100%',
            overflow: 'auto',
            paddingTop: '8px',
            paddingBottom: '16px',
          }}
        >
          {schools.map((card) => (
            <Grid item key={card.id} sx={{ display: 'flex' }}>
              <Link to={`/school/${card.id}`} style={{ textDecoration: 'none' }}>
                <Card
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    width: '200px',
                    height: '200px',
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
                      backgroundColor: 'white',
                      backgroundSize: 'contain',
                      backgroundOrigin: 'content-box',
                      backgroundPosition: 'center',
                      padding: '8px',
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

  throw new Error('Неизвестная ошибка. Компонент <Main />');
};

export default Main;
