import React, { useState } from 'react';

import { UserContext } from './contexts/UserContext';

export const AppState: React.FC = ({ children }) => {
  const [token, setToken] = useState('');
  const [accountName, setAccountName] = useState('');

  return (
    <UserContext.Provider value={{ token, setToken, accountName, setAccountName }}>{children}</UserContext.Provider>
  );
};
