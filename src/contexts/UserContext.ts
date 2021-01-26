import { createContext } from 'react';

export type UserContextType = {
  poesessid: string;
  setPoesessid: (value: string) => unknown;

  token: string;
  setToken: (value: string) => unknown;

  accountName: string;
  setAccountName: (value: string) => unknown;
};

export const UserContext = createContext<UserContextType>({
  poesessid: '',
  setPoesessid: () => null,

  token: '',
  setToken: () => null,

  accountName: '',
  setAccountName: () => null,
});
