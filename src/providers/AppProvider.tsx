import * as React from 'react';
import { QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

import { queryClient } from '../lib/react-query';
import { UserContext } from '../contexts/UserContext';

export const AppProvider: React.FC = ({ children }) => {
  const [token, setToken] = React.useState<string | null>(null);
  const [poesessid, setPoesessid] = React.useState<string | null>(null);
  const [accountName, setAccountName] = React.useState<string | null>(null);

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools />

      <UserContext.Provider value={{ token, setToken, poesessid, setPoesessid, accountName, setAccountName }}>
        {children}
      </UserContext.Provider>
    </QueryClientProvider>
  );
};
