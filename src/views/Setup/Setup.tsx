import React from 'react';

import { useLogged } from '../../hooks/use-logged';

export const SetupView: React.FC = () => {
  const [token, accountName] = useLogged();

  return null;
};
