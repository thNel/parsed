import { getStoreValue } from '@/store';
import { HandledMatch, HandleType, isHandleType, Lookup } from '@/types/utility';
import Box from '@mui/material/Box';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { useIsFetching } from '@tanstack/react-query';
import { ReactElement, useEffect, useState } from 'react';
import { Link as RouterLink, useMatches, useParams } from 'react-router-dom';

const Header = (): ReactElement => {
  const matches = useMatches();
  const params = useParams();
  const [lastMatch, setLastMatch] = useState<HandledMatch | null>(null);
  const isFetching = !!useIsFetching();

  useEffect(() => {
    const filteredMatches = matches.filter((item): item is HandledMatch =>
      isHandleType(item.handle),
    );
    setLastMatch(filteredMatches[filteredMatches.length - 1]);
  }, [matches, isFetching]);

  const getCrumbTitle = (handle: HandleType): string | null => {
    if (handle.crumbTitle !== 'auto') return handle.crumbTitle;
    if (!handle.storeKey || !handle.paramsKey) {
      return null;
    }
    const storeKey = handle.storeKey.map((item) =>
      String(item.startsWith(':') ? params[item.slice(1)] : item),
    );
    const currentEntityId =
      params[handle.paramsKey] === 'none' ? '-1' : params[handle.paramsKey];
    if (!currentEntityId) {
      return null;
    }
    const entity = getStoreValue<Lookup[]>(storeKey)?.find(
      (item) => item.id === parseInt(currentEntityId),
    );
    return entity?.title ?? null;
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Breadcrumbs aria-label="breadcrumb">
        {matches
          .filter((item): item is HandledMatch => isHandleType(item.handle))
          .map((match) => {
            const crumbTitle = getCrumbTitle(match.handle);
            if (!crumbTitle) {
              return null;
            }
            if (match.pathname === lastMatch?.pathname)
              return (
                <Typography key={match.id} color="text.primary">
                  {crumbTitle}
                </Typography>
              );
            return (
              <Link
                key={match.id}
                component={RouterLink}
                underline="hover"
                color="inherit"
                to={{ pathname: match.pathname }}
              >
                {crumbTitle}
              </Link>
            );
          })}
      </Breadcrumbs>
    </Box>
  );
};
export default Header;