import * as React from 'react';
import { QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

import { Profile } from '../interfaces/profile.interfaces';
import { queryClient } from '../lib/react-query';
import { UserContext } from '../contexts/UserContext';

export const AppProvider: React.FC = ({ children }) => {
  const [token, setToken] = React.useState<string | null>(null);
  const [poesessid, setPoesessid] = React.useState<string | null>(null);
  const [accountName, setAccountName] = React.useState<string | null>(null);
  const [profiles, setProfiles] = React.useState<Profile[]>([]);

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools />

      <UserContext.Provider
        value={{ token, setToken, poesessid, setPoesessid, accountName, setAccountName, profiles, setProfiles }}
      >
        {children}
      </UserContext.Provider>
    </QueryClientProvider>
  );
};
