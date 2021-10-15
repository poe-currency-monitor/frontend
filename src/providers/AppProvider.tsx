import * as React from 'react';
import { QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

import { queryClient } from '../lib/react-query';

export const AppProvider: React.FC = ({ children }) => (
  <QueryClientProvider client={queryClient}>
    <ReactQueryDevtools />

    {children}
  </QueryClientProvider>
);
