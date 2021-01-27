import { createContext } from 'react';

import { CurrenciesResponse, ItemsResponse } from '../interfaces/poe-ninja.interfaces';

export type RatesContextType = {
  currencyRates: CurrenciesResponse | null;
  setCurrencyRates: (value: CurrenciesResponse | null) => unknown;

  fragmentRates: CurrenciesResponse | null;
  setFragmentRates: (value: CurrenciesResponse | null) => unknown;

  deliriumOrbRates: ItemsResponse | null;
  setDeliriumOrbRates: (value: ItemsResponse | null) => unknown;

  watchstoneRates: ItemsResponse | null;
  setWatchstoneRates: (value: ItemsResponse | null) => unknown;

  oilRates: ItemsResponse | null;
  setOilRates: (value: ItemsResponse | null) => unknown;

  incubatorRates: ItemsResponse | null;
  setIncubatorRates: (value: ItemsResponse | null) => unknown;

  scarabRates: ItemsResponse | null;
  setScarabRates: (value: ItemsResponse | null) => unknown;

  fossilRates: ItemsResponse | null;
  setFossilRates: (value: ItemsResponse | null) => unknown;

  resonatorRates: ItemsResponse | null;
  setResonatorRates: (value: ItemsResponse | null) => unknown;

  essenceRates: ItemsResponse | null;
  setEssenceRates: (value: ItemsResponse | null) => unknown;

  divinationCardRates: ItemsResponse | null;
  setDivinationCardRates: (value: ItemsResponse | null) => unknown;

  prophecyRates: ItemsResponse | null;
  setProphecyRates: (value: ItemsResponse | null) => unknown;

  skillGemRates: ItemsResponse | null;
  setSkillGemRates: (value: ItemsResponse | null) => unknown;

  uniqueMapRates: ItemsResponse | null;
  setUniqueMapRates: (value: ItemsResponse | null) => unknown;

  mapRates: ItemsResponse | null;
  setMapRates: (value: ItemsResponse | null) => unknown;

  uniqueJewelRates: ItemsResponse | null;
  setUniqueJewelRates: (value: ItemsResponse | null) => unknown;

  uniqueFlaskRates: ItemsResponse | null;
  setUniqueFlaskRates: (value: ItemsResponse | null) => unknown;

  beastRates: ItemsResponse | null;
  setBeastRates: (value: ItemsResponse | null) => unknown;

  vialRates: ItemsResponse | null;
  setVialRates: (value: ItemsResponse | null) => unknown;
};

export const RatesContext = createContext<RatesContextType>({
  currencyRates: null,
  setCurrencyRates: () => null,

  fragmentRates: null,
  setFragmentRates: () => null,

  deliriumOrbRates: null,
  setDeliriumOrbRates: () => null,

  watchstoneRates: null,
  setWatchstoneRates: () => null,

  oilRates: null,
  setOilRates: () => null,

  incubatorRates: null,
  setIncubatorRates: () => null,

  scarabRates: null,
  setScarabRates: () => null,

  fossilRates: null,
  setFossilRates: () => null,

  resonatorRates: null,
  setResonatorRates: () => null,

  essenceRates: null,
  setEssenceRates: () => null,

  divinationCardRates: null,
  setDivinationCardRates: () => null,

  prophecyRates: null,
  setProphecyRates: () => null,

  skillGemRates: null,
  setSkillGemRates: () => null,

  uniqueMapRates: null,
  setUniqueMapRates: () => null,

  mapRates: null,
  setMapRates: () => null,

  uniqueJewelRates: null,
  setUniqueJewelRates: () => null,

  uniqueFlaskRates: null,
  setUniqueFlaskRates: () => null,

  beastRates: null,
  setBeastRates: () => null,

  vialRates: null,
  setVialRates: () => null,
});
