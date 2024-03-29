import * as React from 'react';

import { CurrenciesResponse, ItemsResponse } from '../interfaces/poe-ninja.interfaces';
import { RatesContext } from '../contexts/RatesContext';

export const RatesContextProvider: React.FC = ({ children }) => {
  const [currencyRates, setCurrencyRates] = React.useState<CurrenciesResponse | null>(null);
  const [fragmentRates, setFragmentRates] = React.useState<CurrenciesResponse | null>(null);

  const [divinationCardRates, setDivinationCardRates] = React.useState<ItemsResponse | null>(null);
  const [prophecyRates, setProphecyRates] = React.useState<ItemsResponse | null>(null);
  const [oilRates, setOilRates] = React.useState<ItemsResponse | null>(null);
  const [incubatorRates, setIncubatorRates] = React.useState<ItemsResponse | null>(null);
  const [uniqueWeaponRates, setUniqueWeaponRates] = React.useState<ItemsResponse | null>(null);
  const [uniqueArmourRates, setUniqueArmourRates] = React.useState<ItemsResponse | null>(null);
  const [uniqueAccessoryRates, setUniqueAccessoryRates] = React.useState<ItemsResponse | null>(null);
  const [uniqueFlaskRates, setUniqueFlaskRates] = React.useState<ItemsResponse | null>(null);
  const [uniqueJewelRates, setUniqueJewelRates] = React.useState<ItemsResponse | null>(null);
  const [skillGemRates, setSkillGemRates] = React.useState<ItemsResponse | null>(null);
  const [mapRates, setMapRates] = React.useState<ItemsResponse | null>(null);
  const [blightedMapRates, setBlightedMapRates] = React.useState<ItemsResponse | null>(null);
  const [uniqueMapRates, setUniqueMapRates] = React.useState<ItemsResponse | null>(null);
  const [deliriumOrbRates, setDeliriumOrbRates] = React.useState<ItemsResponse | null>(null);
  const [invitationRates, setInvitationRates] = React.useState<ItemsResponse | null>(null);
  const [scarabRates, setScarabRates] = React.useState<ItemsResponse | null>(null);
  const [watchstoneRates, setWatchstoneRates] = React.useState<ItemsResponse | null>(null);
  const [baseTypeRates, setBaseTypeRates] = React.useState<ItemsResponse | null>(null);
  const [fossilRates, setFossilRates] = React.useState<ItemsResponse | null>(null);
  const [resonatorRates, setResonatorRates] = React.useState<ItemsResponse | null>(null);
  const [helmetEnchantRates, setHelmetEnchantRates] = React.useState<ItemsResponse | null>(null);
  const [beastRates, setBeastRates] = React.useState<ItemsResponse | null>(null);
  const [essenceRates, setEssenceRates] = React.useState<ItemsResponse | null>(null);
  const [vialRates, setVialRates] = React.useState<ItemsResponse | null>(null);

  return (
    <RatesContext.Provider
      value={{
        currencyRates,
        setCurrencyRates,
        fragmentRates,
        setFragmentRates,
        divinationCardRates,
        setDivinationCardRates,
        prophecyRates,
        setProphecyRates,
        oilRates,
        setOilRates,
        incubatorRates,
        setIncubatorRates,
        uniqueWeaponRates,
        setUniqueWeaponRates,
        uniqueArmourRates,
        setUniqueArmourRates,
        uniqueAccessoryRates,
        setUniqueAccessoryRates,
        uniqueFlaskRates,
        setUniqueFlaskRates,
        uniqueJewelRates,
        setUniqueJewelRates,
        skillGemRates,
        setSkillGemRates,
        mapRates,
        setMapRates,
        blightedMapRates,
        setBlightedMapRates,
        uniqueMapRates,
        setUniqueMapRates,
        deliriumOrbRates,
        setDeliriumOrbRates,
        invitationRates,
        setInvitationRates,
        scarabRates,
        setScarabRates,
        watchstoneRates,
        setWatchstoneRates,
        baseTypeRates,
        setBaseTypeRates,
        fossilRates,
        setFossilRates,
        resonatorRates,
        setResonatorRates,
        helmetEnchantRates,
        setHelmetEnchantRates,
        beastRates,
        setBeastRates,
        essenceRates,
        setEssenceRates,
        vialRates,
        setVialRates,
      }}
    >
      {children}
    </RatesContext.Provider>
  );
};
