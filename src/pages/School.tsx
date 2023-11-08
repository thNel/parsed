import ErrorBoundary from '@/components/ErrorBoundary';
import Preloader from '@/components/Preloader';
import { noImageUrl } from '@/constants/other';
import { useCategoriesQuery } from '@/store/categories';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { ReactElement } from 'react';
import { Link, useOutlet, useParams } from 'react-router-dom';

const School = (): ReactElement => {
  const { schoolId } = useParams();
  const Outlet = useOutlet();

  const {
    isError,
    isSuccess,
    isLoading,
    data: categories,
  } = useCategoriesQuery(String(schoolId));

  if (isLoading || categories === null) return <Preloader thickness={5} />;

  if (isError || categories.length < 1)
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
        <Typography variant="h4">Категория</Typography>
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
          {categories.map((card) => (
            <Grid item key={card.id} sx={{ display: 'flex' }}>
              <Link
                to={`/school/${schoolId}/category/${card.id >= 0 ? card.id : 'none'}`}
                style={{ textDecoration: 'none' }}
              >
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
  }

  throw new Error('Неизвестная ошибка. Компонент <School />');
};

export default School;
