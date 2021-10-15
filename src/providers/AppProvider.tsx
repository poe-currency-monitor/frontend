import * as React from 'react';
import { QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

import { queryClient } from '../lib/react-query';
import { UserContext } from '../contexts/UserContext';

export const AppProvider: React.FC = ({ children }) => {
  const [token, setToken] = React.useState<string | null>(null);

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools />

      <UserContext.Provider value={{ token, setToken }}>{children}</UserContext.Provider>
    </QueryClientProvider>
  );
};
