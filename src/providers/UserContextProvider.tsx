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

  // Snapshots are updated on the `currentProfile` variable, so we need to make
  // sure they are also updated in the `profiles` variables and save it to the
  // local-storage. When `profiles` changes, it will trigger a local-storage save.
  React.useEffect(() => {
    if (currentProfile && currentProfile.snapshots) {
      const updatedProfiles = profiles.map((profile) => {
        if (profile.name === currentProfile.name) {
          return { ...profile, snapshots: currentProfile.snapshots };
        }

        return profile;
      });

      setProfiles(updatedProfiles);
    }
  }, [currentProfile, currentProfile?.snapshots]);

  // On mounted, load POESESSID from local-storage.
  React.useEffect(() => {
    const storedPoesessid = localStorage.getItem('poesessid');

    if (storedPoesessid) {
      setPoesessid(storedPoesessid);
    }
  }, []);

  // Save POESESSID to local-storage when it changes.
  React.useEffect(() => {
    if (poesessid) {
      localStorage.setItem('poesessid', poesessid);
    }
  }, [poesessid]);

  // On mounted, load profiles from local-storage.
  React.useEffect(() => {
    const storedProfiles = JSON.parse(localStorage.getItem('profiles') || '[]') as Profile[];

    setProfiles(storedProfiles);
  }, []);

  // Store profiles in the local-storage when they change.
  React.useEffect(() => {
    if (profiles.length) {
      localStorage.setItem('profiles', JSON.stringify(profiles));
    }
  }, [profiles]);

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
