import { UseQueryResult, useQuery } from 'react-query';

import { StashTabsResponse } from '../interfaces/api.interfaces';
import { getStashTabs } from '../API';

/**
 * Fetch stash-tabs from a specific PoE account and league.
 *
 * Trigger a request using the `fetchStashTabs` query object.
 *
 * @param token JWT token.
 * @param poesessid Path of Exile session-ID.
 * @param league PoE league to fetch rates from.
 * @param accountName Name of the PoE account.
 * @returns react-query `useQuery` object.
 */
export function useLoadStashTabs(
  token?: string | null,
  poesessid?: string | null,
  league?: string | null,
  accountName?: string | null,
): { fetchStashTabs: UseQueryResult<StashTabsResponse, unknown> } {
  const fetchStashTabs = useQuery(['getStashTabs', { token, poesessid, league, accountName }], getStashTabs, {
    enabled: false,
  });

  return { fetchStashTabs };
}
