import React from 'react';
import { QueryClientProvider, QueryClient } from 'react-query';

import { AppState } from './AppState';
import { Router } from './Router';

export const App: React.FC = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        refetchOnReconnect: false,
      },
    },
  });

  return (
    <AppState>
      <QueryClientProvider client={queryClient}>
        <Router />
      </QueryClientProvider>
    </AppState>
  );
};
