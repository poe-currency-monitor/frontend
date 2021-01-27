import React, { useState } from 'react';

import { Character, StashTab, Item } from './interfaces/poe.interfaces';
import { CurrenciesResponse, ItemsResponse } from './interfaces/poe-ninja.interfaces';
import { RatesContext } from './contexts/RatesContext';
import { UserContext } from './contexts/UserContext';

export const AppState: React.FC = ({ children }) => {
  const [poesessid, setPoesessid] = useState('');
  const [token, setToken] = useState('');
  const [accountName, setAccountName] = useState('');
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null);
  const [selectedStashTabs, setSelectedStashTabs] = useState<StashTab[]>([]);
  const [stashTabsItems, setStashTabsItems] = useState<{ [key: string]: Item[] } | null>(null);

  const [currencyRates, setCurrencyRates] = useState<CurrenciesResponse | null>(null);
  const [fragmentRates, setFragmentRates] = useState<CurrenciesResponse | null>(null);

  const [deliriumOrbRates, setDeliriumOrbRates] = useState<ItemsResponse | null>(null);
  const [watchstoneRates, setWatchstoneRates] = useState<ItemsResponse | null>(null);
  const [oilRates, setOilRates] = useState<ItemsResponse | null>(null);
  const [incubatorRates, setIncubatorRates] = useState<ItemsResponse | null>(null);
  const [scarabRates, setScarabRates] = useState<ItemsResponse | null>(null);
  const [fossilRates, setFossilRates] = useState<ItemsResponse | null>(null);
  const [resonatorRates, setResonatorRates] = useState<ItemsResponse | null>(null);
  const [essenceRates, setEssenceRates] = useState<ItemsResponse | null>(null);
  const [divinationCardRates, setDivinationCardRates] = useState<ItemsResponse | null>(null);
  const [prophecyRates, setProphecyRates] = useState<ItemsResponse | null>(null);
  const [skillGemRates, setSkillGemRates] = useState<ItemsResponse | null>(null);
  const [uniqueMapRates, setUniqueMapRates] = useState<ItemsResponse | null>(null);
  const [mapRates, setMapRates] = useState<ItemsResponse | null>(null);
  const [uniqueJewelRates, setUniqueJewelRates] = useState<ItemsResponse | null>(null);
  const [uniqueFlaskRates, setUniqueFlaskRates] = useState<ItemsResponse | null>(null);
  const [beastRates, setBeastRates] = useState<ItemsResponse | null>(null);
  const [vialRates, setVialRates] = useState<ItemsResponse | null>(null);

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
        stashTabsItems,
        setStashTabsItems,
      }}
    >
      <RatesContext.Provider
        value={{
          currencyRates,
          setCurrencyRates,
          fragmentRates,
          setFragmentRates,
          deliriumOrbRates,
          setDeliriumOrbRates,
          watchstoneRates,
          setWatchstoneRates,
          oilRates,
          setOilRates,
          incubatorRates,
          setIncubatorRates,
          scarabRates,
          setScarabRates,
          fossilRates,
          setFossilRates,
          resonatorRates,
          setResonatorRates,
          essenceRates,
          setEssenceRates,
          divinationCardRates,
          setDivinationCardRates,
          prophecyRates,
          setProphecyRates,
          skillGemRates,
          setSkillGemRates,
          uniqueMapRates,
          setUniqueMapRates,
          mapRates,
          setMapRates,
          uniqueJewelRates,
          setUniqueJewelRates,
          uniqueFlaskRates,
          setUniqueFlaskRates,
          beastRates,
          setBeastRates,
          vialRates,
          setVialRates,
        }}
      >
        {children}
      </RatesContext.Provider>
    </UserContext.Provider>
  );
};
