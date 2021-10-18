import * as React from 'react';

export type UserContextType = {
  token: string | null;
  setToken: React.Dispatch<React.SetStateAction<string | null>>;

  poesessid: string | null;
  setPoesessid: React.Dispatch<React.SetStateAction<string | null>>;

  accountName: string | null;
  setAccountName: React.Dispatch<React.SetStateAction<string | null>>;
};

export const UserContext = React.createContext<UserContextType>({
  token: null,
  setToken: () => null,

  poesessid: null,
  setPoesessid: () => null,

  accountName: null,
  setAccountName: () => null,
});
