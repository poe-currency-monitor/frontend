import * as React from 'react';

import { Profile } from '../interfaces/profile.interfaces';
import { StashTab, StashTabsItems } from '../interfaces/poe.interfaces';
import { UserContext } from '../contexts/UserContext';

export const UserContextProvider: React.FC = ({ children }) => {
  const [token, setToken] = React.useState<string | null>(null);
  const [poesessid, setPoesessid] = React.useState<string | null>(null);
  const [accountName, setAccountName] = React.useState<string | null>(null);
  const [profiles, setProfiles] = React.useState<Profile[]>([]);
  const [currentProfile, setCurrentProfile] = React.useState<Profile | null>(null);
  const [stashTabs, setStashTabs] = React.useState<StashTab[]>([]);
  const [stashTabsItems, setStashTabsItems] = React.useState<StashTabsItems>({});

  return (
    <UserContext.Provider
      value={{
        token,
        setToken,
        poesessid,
        setPoesessid,
        accountName,
        setAccountName,
        profiles,
        setProfiles,
        currentProfile,
        setCurrentProfile,
        stashTabs,
        setStashTabs,
        stashTabsItems,
        setStashTabsItems,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
