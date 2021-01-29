import React, { useContext, useEffect, useMemo } from 'react';
import { useQuery } from 'react-query';
import useInterval from '@use-it/interval';

import { Item } from '../../interfaces/poe.interfaces';
import { getStashTabsItems, StashTabsItemsResponse } from '../../API';
import { UserContext } from '../../contexts/UserContext';
import { useLogged } from '../../hooks/use-logged';
import { useItemsDiff } from '../../hooks/use-items-diff';
import { useCalculateWorth } from '../../hooks/use-calculate-worth';
import { ItemsWorthTable } from '../../components/ItemsWorthTable';

const FETCH_DELAY = 30000;

/**
 * Format stash-tabs item API response into a usable object.
 *
 * @param items Items response from stash-tabs items API endpoint.
 */
const formatItemsPayload = (items: StashTabsItemsResponse | null | undefined): { [key: string]: Item[] } => {
  const payload: { [key: string]: Item[] } = {};

  if (items) {
    Object.entries(items.items).forEach(([key, value]) => {
      payload[key] = value.items;
    });
  }

  return payload;
};

export const DashboardView: React.FC = () => {
  const [poesessid, token, accountName] = useLogged();

  const { selectedCharacter, selectedStashTabs, stashTabsItems, setStashTabsItems } = useContext(UserContext);

  const league = useMemo(() => (selectedCharacter ? selectedCharacter.league : 'Standard'), [selectedCharacter]);
  const tabIndexes = useMemo(() => selectedStashTabs.map((tab) => tab.i).join(','), [selectedStashTabs]);
  const stashTabsItemsMemo = useMemo(() => stashTabsItems || {}, [stashTabsItems]);

  const items = useQuery(['getStashTabsItems', poesessid, token, accountName, league, tabIndexes], () =>
    poesessid && token && accountName && league && tabIndexes
      ? getStashTabsItems(poesessid, token, accountName, league, tabIndexes)
      : null,
  );

  const itemsData = useMemo(() => formatItemsPayload(items.data), [items]);

  const itemsDiff = useItemsDiff(itemsData, stashTabsItemsMemo);
  const { currencyItemsWorth } = useCalculateWorth(itemsData);
  const itemsWorth = useMemo(() => [...currencyItemsWorth], [currencyItemsWorth]);

  // Initial load of stash-tabs items.
  useEffect(() => {
    if (!items.isLoading && items.data && !stashTabsItems) {
      const payload = formatItemsPayload(items.data);
      setStashTabsItems(payload);
    }
  }, [items, stashTabsItems, setStashTabsItems]);

  // Triggered each time stash-tabs items are fetched and when there are new
  // items between the `UserContext.stashTabsItems` and `query.data.items`.
  useEffect(() => {
    if (!items.isLoading && items.data && stashTabsItems && itemsDiff) {
      console.log('stash-tabs items refetched it contains new items', itemsDiff);
    }
  }, [items, stashTabsItems, itemsDiff]);

  // Initialize interval to load items X seconds.
  useInterval(() => {
    items.refetch().catch(() => null);
  }, FETCH_DELAY);

  return (
    <main className="flex flex-col justify-center max-w-5xl mx-auto">
      <h1 className="mb-8 mt-12 text-white text-center text-3xl font-bold">Dashboard</h1>

      <section>
        <h2 className="mb-4 text-white text-xl font-medium">Stash-tabs content</h2>

        <ItemsWorthTable items={itemsWorth} />
      </section>
    </main>
  );
};
