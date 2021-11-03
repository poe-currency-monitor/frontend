import { UseQueryResult, useQuery } from 'react-query';

import { StashTabsItemsResponse } from '../interfaces/api.interfaces';
import { getStashTabsItems } from '../API';

/**
 * Fetch items from a specific PoE account, league and stash-tabs.
 *
 * Trigger a request using the `fetchStashItems` query object.
 *
 * @param token JWT token.
 * @param poesessid Path of Exile session-ID.
 * @param league PoE league to fetch rates from.
 * @param accountName Name of the PoE account.
 * @param tabsIndexes Indexes of stash-tabs to fetch items from.
 * @returns react-query `useQuery` object.
 */
export function useLoadStashItems(
  token?: string | null,
  poesessid?: string | null,
  league?: string | null,
  accountName?: string | null,
  tabsIndexes?: string | null,
): { fetchStashItems: UseQueryResult<StashTabsItemsResponse, unknown> } {
  const fetchStashItems = useQuery(
    ['getStashTabsItems', { token, poesessid, league, accountName, tabsIndexes }],
    getStashTabsItems,
    {
      enabled: false,
      retry: false,
    },
  );

  return { fetchStashItems };
}
