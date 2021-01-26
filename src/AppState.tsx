import React, { useState } from 'react';

import { UserContext } from './contexts/UserContext';

export const AppState: React.FC = ({ children }) => {
  const [poesessid, setPoesessid] = useState('');
  const [token, setToken] = useState('');
  const [accountName, setAccountName] = useState('');

  return (
    <UserContext.Provider value={{ poesessid, setPoesessid, token, setToken, accountName, setAccountName }}>
      {children}
    </UserContext.Provider>
  );
};
