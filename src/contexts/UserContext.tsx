import * as React from 'react';

import { Profile } from '../interfaces/profile.interfaces';

export type UserContextType = {
  token: string | null;
  setToken: React.Dispatch<React.SetStateAction<string | null>>;

  poesessid: string | null;
  setPoesessid: React.Dispatch<React.SetStateAction<string | null>>;

  accountName: string | null;
  setAccountName: React.Dispatch<React.SetStateAction<string | null>>;

  profiles: Profile[];
  setProfiles: React.Dispatch<React.SetStateAction<Profile[]>>;

  currentProfile: Profile | null;
  setCurrentProfile: React.Dispatch<React.SetStateAction<Profile | null>>;
};

export const UserContext = React.createContext<UserContextType>({
  token: null,
  setToken: () => null,

  poesessid: null,
  setPoesessid: () => null,

  accountName: null,
  setAccountName: () => null,

  profiles: [],
  setProfiles: () => [],

  currentProfile: null,
  setCurrentProfile: () => null,
});
