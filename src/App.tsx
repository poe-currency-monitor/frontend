import React from 'react';
import { QueryClientProvider, QueryClient } from 'react-query';

import { LoginView } from './views/login';

export const App: React.FC = () => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <LoginView />
    </QueryClientProvider>
  );
};
