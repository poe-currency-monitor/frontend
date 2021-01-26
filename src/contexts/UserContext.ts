import { createContext } from 'react';

export type UserContextType = {
  token: string;
  setToken: (value: string) => unknown;

  accountName: string;
  setAccountName: (value: string) => unknown;
};

export const UserContext = createContext<UserContextType>({
  token: '',
  setToken: () => null,

  accountName: '',
  setAccountName: () => null,
});
