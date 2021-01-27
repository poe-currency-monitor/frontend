import { createContext } from 'react';

import { Character, StashTab, Item } from '../interfaces/poe.interfaces';

export type UserContextType = {
  poesessid: string;
  setPoesessid: (value: string) => unknown;

  token: string;
  setToken: (value: string) => unknown;

  accountName: string;
  setAccountName: (value: string) => unknown;

  selectedCharacter: Character | null;
  setSelectedCharacter: (value: Character | null) => unknown;

  selectedStashTabs: StashTab[];
  setSelectedStashTabs: (value: StashTab[]) => unknown;

  stashTabsItems: { [key: string]: Item[] } | null;
  setStashTabsItems: (value: { [key: string]: Item[] } | null) => unknown;
};

export const UserContext = createContext<UserContextType>({
  poesessid: '',
  setPoesessid: () => null,

  token: '',
  setToken: () => null,

  accountName: '',
  setAccountName: () => null,

  selectedCharacter: null,
  setSelectedCharacter: () => null,

  selectedStashTabs: [],
  setSelectedStashTabs: () => null,

  stashTabsItems: null,
  setStashTabsItems: () => null,
});
