import * as React from 'react';

import { CurrenciesResponse, ItemsResponse } from '../interfaces/poe-ninja.interfaces';

export type RatesContextType = {
  // ==========
  // GENERAL
  // ==========
  currencyRates: CurrenciesResponse | null;
  setCurrencyRates: (value: CurrenciesResponse | null) => unknown;

  fragmentRates: CurrenciesResponse | null;
  setFragmentRates: (value: CurrenciesResponse | null) => unknown;

  divinationCardRates: ItemsResponse | null;
  setDivinationCardRates: (value: ItemsResponse | null) => unknown;

  prophecyRates: ItemsResponse | null;
  setProphecyRates: (value: ItemsResponse | null) => unknown;

  oilRates: ItemsResponse | null;
  setOilRates: (value: ItemsResponse | null) => unknown;

  incubatorRates: ItemsResponse | null;
  setIncubatorRates: (value: ItemsResponse | null) => unknown;

  // ==========
  // EQUIPMENT & GEMS
  // ==========
  uniqueWeaponRates: ItemsResponse | null;
  setUniqueWeaponRates: (value: ItemsResponse | null) => unknown;

  uniqueArmourRates: ItemsResponse | null;
  setUniqueArmourRates: (value: ItemsResponse | null) => unknown;

  uniqueAccessoryRates: ItemsResponse | null;
  setUniqueAccessoryRates: (value: ItemsResponse | null) => unknown;

  uniqueFlaskRates: ItemsResponse | null;
  setUniqueFlaskRates: (value: ItemsResponse | null) => unknown;

  uniqueJewelRates: ItemsResponse | null;
  setUniqueJewelRates: (value: ItemsResponse | null) => unknown;

  skillGemRates: ItemsResponse | null;
  setSkillGemRates: (value: ItemsResponse | null) => unknown;

  // ==========
  // ATLAS
  // ==========
  mapRates: ItemsResponse | null;
  setMapRates: (value: ItemsResponse | null) => unknown;

  blightedMapRates: ItemsResponse | null;
  setBlightedMapRates: (value: ItemsResponse | null) => unknown;

  uniqueMapRates: ItemsResponse | null;
  setUniqueMapRates: (value: ItemsResponse | null) => unknown;

  deliriumOrbRates: ItemsResponse | null;
  setDeliriumOrbRates: (value: ItemsResponse | null) => unknown;

  invitationRates: ItemsResponse | null;
  setInvitationRates: (value: ItemsResponse | null) => unknown;

  scarabRates: ItemsResponse | null;
  setScarabRates: (value: ItemsResponse | null) => unknown;

  watchstoneRates: ItemsResponse | null;
  setWatchstoneRates: (value: ItemsResponse | null) => unknown;

  // ==========
  // CRAFTING
  // ==========
  baseTypeRates: ItemsResponse | null;
  setBaseTypeRates: (value: ItemsResponse | null) => unknown;

  fossilRates: ItemsResponse | null;
  setFossilRates: (value: ItemsResponse | null) => unknown;

  resonatorRates: ItemsResponse | null;
  setResonatorRates: (value: ItemsResponse | null) => unknown;

  helmetEnchantRates: ItemsResponse | null;
  setHelmetEnchantRates: (value: ItemsResponse | null) => unknown;

  beastRates: ItemsResponse | null;
  setBeastRates: (value: ItemsResponse | null) => unknown;

  essenceRates: ItemsResponse | null;
  setEssenceRates: (value: ItemsResponse | null) => unknown;

  vialRates: ItemsResponse | null;
  setVialRates: (value: ItemsResponse | null) => unknown;
};

export const RatesContext = React.createContext<RatesContextType>({
  // ==========
  // GENERAL
  // ==========
  currencyRates: null,
  setCurrencyRates: () => null,

  fragmentRates: null,
  setFragmentRates: () => null,

  divinationCardRates: null,
  setDivinationCardRates: () => null,

  prophecyRates: null,
  setProphecyRates: () => null,

  oilRates: null,
  setOilRates: () => null,

  incubatorRates: null,
  setIncubatorRates: () => null,

  // ==========
  // EQUIPMENT & GEMS
  // ==========
  uniqueWeaponRates: null,
  setUniqueWeaponRates: () => null,

  uniqueArmourRates: null,
  setUniqueArmourRates: () => null,

  uniqueAccessoryRates: null,
  setUniqueAccessoryRates: () => null,

  uniqueFlaskRates: null,
  setUniqueFlaskRates: () => null,

  uniqueJewelRates: null,
  setUniqueJewelRates: () => null,

  skillGemRates: null,
  setSkillGemRates: () => null,

  // ==========
  // ATLAS
  // ==========
  mapRates: null,
  setMapRates: () => null,

  blightedMapRates: null,
  setBlightedMapRates: () => null,

  uniqueMapRates: null,
  setUniqueMapRates: () => null,

  deliriumOrbRates: null,
  setDeliriumOrbRates: () => null,

  invitationRates: null,
  setInvitationRates: () => null,

  scarabRates: null,
  setScarabRates: () => null,

  watchstoneRates: null,
  setWatchstoneRates: () => null,

  // ==========
  // CRAFTING
  // ==========
  baseTypeRates: null,
  setBaseTypeRates: () => null,

  fossilRates: null,
  setFossilRates: () => null,

  resonatorRates: null,
  setResonatorRates: () => null,

  helmetEnchantRates: null,
  setHelmetEnchantRates: () => null,

  beastRates: null,
  setBeastRates: () => null,

  essenceRates: null,
  setEssenceRates: () => null,

  vialRates: null,
  setVialRates: () => null,
});
