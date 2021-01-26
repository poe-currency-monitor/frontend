import React from 'react';
import { QueryClientProvider, QueryClient } from 'react-query';

import { Router } from './Router';

export const App: React.FC = () => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Router />
    </QueryClientProvider>
  );
};
