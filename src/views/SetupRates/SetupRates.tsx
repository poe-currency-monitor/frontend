import React, { useContext, useEffect, useMemo } from 'react';
import { useQuery } from 'react-query';
import { useHistory } from 'react-router-dom';
import { Spin } from 'antd';

import { getAllCurrencyRates, getAllItemRates } from '../../API';
import { RatesContext } from '../../contexts/RatesContext';
import { UserContext } from '../../contexts/UserContext';
import { useLogged } from '../../hooks/use-logged';

export const SetupRatesView: React.FC = () => {
  const [, token] = useLogged();

  const {
    setCurrencyRates,
    setFragmentRates,
    setBeastRates,
    setDeliriumOrbRates,
    setDivinationCardRates,
    setEssenceRates,
    setFossilRates,
    setIncubatorRates,
    setMapRates,
    setOilRates,
    setProphecyRates,
    setResonatorRates,
    setScarabRates,
    // setSkillGemRates,
    setUniqueFlaskRates,
    setUniqueJewelRates,
    setUniqueMapRates,
    setVialRates,
    setWatchstoneRates,
  } = useContext(RatesContext);

  const { selectedCharacter } = useContext(UserContext);

  const history = useHistory();

  const league = useMemo(() => (selectedCharacter ? selectedCharacter.league : 'Standard'), [selectedCharacter]);

  const currencyRates = useQuery(['getAllCurrencyRates', token, league], () =>
    token && league ? getAllCurrencyRates(token, league) : null,
  );

  const itemRates = useQuery(['getAllItemRates', token, league], () =>
    token && league ? getAllItemRates(token, league) : null,
  );

  useEffect(() => {
    if (!currencyRates.isLoading && currencyRates.data) {
      currencyRates.data.categories.forEach((category) => {
        if (category.type === 'Currency') {
          setCurrencyRates(category.response);
        } else if (category.type === 'Fragment') {
          setFragmentRates(category.response);
        }
      });
    }
  }, [currencyRates, setCurrencyRates, setFragmentRates]);

  useEffect(() => {
    if (!itemRates.isLoading && itemRates.data) {
      itemRates.data.categories.forEach((category) => {
        if (category.type === 'Beast') {
          setBeastRates(category.response);
        } else if (category.type === 'DeliriumOrb') {
          setDeliriumOrbRates(category.response);
        } else if (category.type === 'DivinationCard') {
          setDivinationCardRates(category.response);
        } else if (category.type === 'Essence') {
          setEssenceRates(category.response);
        } else if (category.type === 'Fossil') {
          setFossilRates(category.response);
        } else if (category.type === 'Incubator') {
          setIncubatorRates(category.response);
        } else if (category.type === 'Map') {
          setMapRates(category.response);
        } else if (category.type === 'Oil') {
          setOilRates(category.response);
        } else if (category.type === 'Prophecy') {
          setProphecyRates(category.response);
        } else if (category.type === 'Resonator') {
          setResonatorRates(category.response);
        } else if (category.type === 'Scarab') {
          setScarabRates(category.response);
        }
        // Too resource intensive and maybe too much useless...
        // else if (category.type === 'SkillGem') {
        //   setSkillGemRates(category.response);
        // }
        else if (category.type === 'UniqueFlask') {
          setUniqueFlaskRates(category.response);
        } else if (category.type === 'UniqueJewel') {
          setUniqueJewelRates(category.response);
        } else if (category.type === 'UniqueMap') {
          setUniqueMapRates(category.response);
        } else if (category.type === 'Vial') {
          setVialRates(category.response);
        } else if (category.type === 'Watchstone') {
          setWatchstoneRates(category.response);
        }
      });

      history.push('/dashboard');
    }
  }, [
    itemRates,
    setBeastRates,
    setDeliriumOrbRates,
    setDivinationCardRates,
    setEssenceRates,
    setFossilRates,
    setIncubatorRates,
    setMapRates,
    setOilRates,
    setProphecyRates,
    setResonatorRates,
    setScarabRates,
    setUniqueFlaskRates,
    setUniqueJewelRates,
    setUniqueMapRates,
    setVialRates,
    setWatchstoneRates,
    history,
  ]);

  return (
    <main className="flex flex-col justify-center max-w-5xl mx-auto">
      <h1 className="mb-8 mt-12 text-white text-center text-3xl font-bold">
        Loading rates for <span className="text-blue-400">{league}</span> league...
      </h1>

      <Spin size="large" />
    </main>
  );
};
