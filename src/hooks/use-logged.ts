import { useContext, useEffect, useMemo } from 'react';
import { useHistory } from 'react-router-dom';

import { UserContext } from '../contexts/UserContext';

/**
 * Call this hook at the top-level of your views to make sure a user is
 * correctly logged-in.
 *
 * @returns [poesessid, token, accountName, isLogged]
 */
export function useLogged(): [string, string, string, boolean] {
  const history = useHistory();
  const { poesessid, token, accountName } = useContext(UserContext);

  const isLogged = useMemo(() => !!poesessid && !!token && !!accountName, [poesessid, token, accountName]);

  useEffect(() => {
    if (!isLogged) {
      history.push('/');
    }
  }, [isLogged, history]);

  return [poesessid, token, accountName, isLogged];
}
