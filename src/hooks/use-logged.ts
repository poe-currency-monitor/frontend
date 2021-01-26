import { useContext, useEffect, useMemo } from 'react';
import { useHistory } from 'react-router-dom';

import { UserContext } from '../contexts/UserContext';

/**
 * Call this hook at the top-level of your views to make sure a user is
 * correctly logged-in.
 *
 * Check using `token` and `accountName` `UserContext` properties.
 */
export function useLogged(): boolean {
  const history = useHistory();
  const { token, accountName } = useContext(UserContext);

  const isLogged = useMemo(() => !!token && !!accountName, [token, accountName]);

  useEffect(() => {
    if (!isLogged) {
      history.push('/');
    }
  }, [isLogged, history]);

  return isLogged;
}
