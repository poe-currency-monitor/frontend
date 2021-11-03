import * as React from 'react';
import { QueryClientProvider } from 'react-query';

import { queryClient } from '../lib/react-query';
import { UserContextProvider } from './UserContextProvider';
import { RatesContextProvider } from './RatesContextProvider';

export const AppProvider: React.FC = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <UserContextProvider>
        <RatesContextProvider>{children}</RatesContextProvider>
      </UserContextProvider>
    </QueryClientProvider>
  );
};
