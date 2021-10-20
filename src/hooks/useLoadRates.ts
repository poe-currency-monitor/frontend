import * as React from 'react';
import { UseQueryResult, useQuery } from 'react-query';

import { AllCurrenciesRatesResponse, AllItemsRatesResponse } from '../interfaces/poe-ninja.interfaces';
import { getAllCurrenciesRates, getAllItemsRates } from '../API';
import { RatesContext } from '../contexts/RatesContext';

/**
 * Fetch rates and set them automatically in the `RatesContext` for a specified
 * Path of Exile league.
 *
 * Use the `triggerRatesRequest` function to trigger requests.
 *
 * @param token JWT token.
 * @param league PoE league to fetch rates from.
 * @returns react-query `useQuery` objects and a trigger requests function.
 */
export function useLoadRates(
  token?: string | null,
  league?: string | null,
): {
  fetchCurrenciesRates: UseQueryResult<AllCurrenciesRatesResponse, unknown>;
  fetchItemsRates: UseQueryResult<AllItemsRatesResponse, unknown>;
  triggerRatesRequests: () => ReturnType<typeof triggerRatesRequests>;
} {
  const {
    setCurrencyRates,
    setFragmentRates,
    setDivinationCardRates,
    setProphecyRates,
    setOilRates,
    setIncubatorRates,
    setUniqueMapRates,
    setDeliriumOrbRates,
    setInvitationRates,
    setScarabRates,
    setWatchstoneRates,
    setFossilRates,
    setResonatorRates,
    setBeastRates,
    setEssenceRates,
    setVialRates,
  } = React.useContext(RatesContext);

  const fetchCurrenciesRates = useQuery(['fetchCurrenciesRates', { token, league }], getAllCurrenciesRates, {
    enabled: false,

    onSuccess: (data) => {
      const currencyCategory = data.categories.find((category) => category.type === 'Currency');
      const fragmentCategory = data.categories.find((category) => category.type === 'Fragment');

      if (currencyCategory) {
        setCurrencyRates(currencyCategory.response);
      }

      if (fragmentCategory) {
        setFragmentRates(fragmentCategory.response);
      }
    },
  });

  const fetchItemsRates = useQuery(['fetchItemsRates', { token, league }], getAllItemsRates, {
    enabled: false,

    onSuccess: (data) => {
      const divinationCardCategory = data.categories.find((category) => category.type === 'DivinationCard');
      const prophecyCategory = data.categories.find((category) => category.type === 'Prophecy');
      const oilCategory = data.categories.find((category) => category.type === 'Oil');
      const incubatorCategory = data.categories.find((category) => category.type === 'Incubator');
      const uniqueMapCategory = data.categories.find((category) => category.type === 'UniqueMap');
      const deliriumOrbCategory = data.categories.find((category) => category.type === 'DeliriumOrb');
      const invitationCategory = data.categories.find((category) => category.type === 'Invitation');
      const scarabCategory = data.categories.find((category) => category.type === 'Scarab');
      const watchstoneCategory = data.categories.find((category) => category.type === 'Watchstone');
      const fossilCategory = data.categories.find((category) => category.type === 'Fossil');
      const resonatorCategory = data.categories.find((category) => category.type === 'Resonator');
      const beastCategory = data.categories.find((category) => category.type === 'Beast');
      const essenceCategory = data.categories.find((category) => category.type === 'Essence');
      const vialCategory = data.categories.find((category) => category.type === 'Vial');

      if (divinationCardCategory) {
        setDivinationCardRates(divinationCardCategory.response);
      }

      if (prophecyCategory) {
        setProphecyRates(prophecyCategory.response);
      }

      if (oilCategory) {
        setOilRates(oilCategory.response);
      }

      if (incubatorCategory) {
        setIncubatorRates(incubatorCategory.response);
      }

      if (uniqueMapCategory) {
        setUniqueMapRates(uniqueMapCategory.response);
      }

      if (deliriumOrbCategory) {
        setDeliriumOrbRates(deliriumOrbCategory.response);
      }

      if (invitationCategory) {
        setInvitationRates(invitationCategory.response);
      }

      if (scarabCategory) {
        setScarabRates(scarabCategory.response);
      }

      if (watchstoneCategory) {
        setWatchstoneRates(watchstoneCategory.response);
      }

      if (fossilCategory) {
        setFossilRates(fossilCategory.response);
      }

      if (resonatorCategory) {
        setResonatorRates(resonatorCategory.response);
      }

      if (beastCategory) {
        setBeastRates(beastCategory.response);
      }

      if (essenceCategory) {
        setEssenceRates(essenceCategory.response);
      }

      if (vialCategory) {
        setVialRates(vialCategory.response);
      }
    },
  });

  const triggerRatesRequests = () => {
    return Promise.all([fetchCurrenciesRates.refetch(), fetchItemsRates.refetch()]);
  };

  return { fetchCurrenciesRates, fetchItemsRates, triggerRatesRequests };
}
