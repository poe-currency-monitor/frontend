import React, { useState } from 'react';

import { Character, StashTab } from './interfaces/poe.interfaces';
import { UserContext } from './contexts/UserContext';

export const AppState: React.FC = ({ children }) => {
  const [poesessid, setPoesessid] = useState('');
  const [token, setToken] = useState('');
  const [accountName, setAccountName] = useState('');
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null);
  const [selectedStashTabs, setSelectedStashTabs] = useState<StashTab[]>([]);

  return (
    <UserContext.Provider
      value={{
        poesessid,
        setPoesessid,
        token,
        setToken,
        accountName,
        setAccountName,
        selectedCharacter,
        setSelectedCharacter,
        selectedStashTabs,
        setSelectedStashTabs,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
