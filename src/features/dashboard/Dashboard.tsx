import * as React from 'react';

import { UserContext } from '../../contexts/UserContext';
import { useLoadRates } from '../../hooks/useLoadRates';
import { useOnMount } from '../../hooks/useOnMount';

export const Dashboard: React.FC = () => {
  const user = React.useContext(UserContext);

  const { triggerRatesRequests } = useLoadRates(user.token, user.currentProfile?.league);

  useOnMount(() => {
    triggerRatesRequests().catch(() => null);
  });

  return null;
};
