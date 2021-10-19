import { QueryFunctionContext } from 'react-query';

import { LoginResponse, StashTabsResponse } from './interfaces/api.interfaces';

const ENDPOINT = import.meta.env.PROD ? 'https://totominc.io/api' : 'http://localhost:4000/api';

const DEFAULT_HEADERS = {
  'Content-Type': 'application/json',
};

const UNDEFINED_VALUES_ERROR_MESSAGE =
  'Some query parameters are undefined but they should be defined at this time of execution.';

/**
 * Combine `DEFAULT_HEADERS` with `Authorization` header for protected
 * endpoints.
 *
 * @param token JWT.
 */
const getAuthorizationHeaders = (token: string) => ({
  ...DEFAULT_HEADERS,
  Authorization: `Bearer ${token}`,
});

/**
 * Build the query parameter passed from react-query `useQuery` hook.
 */
type QueryParams<T = Record<string, unknown>> = [
  string,
  {
    accountName?: string | null;
    poesessid?: string | null;
    token?: string | null;
  } & T,
];

/**
 * Login a user with a POESESSID on `/auth` endpoint.
 *
 * @param poesessid Path of Exile session ID.
 */
export const postLogin = (poesessid: string): Promise<LoginResponse> => {
  return fetch(`${ENDPOINT}/auth/`, {
    method: 'POST',
    headers: { ...DEFAULT_HEADERS },
    body: JSON.stringify({ poesessid }),
  }).then((response) => {
    if (!response.ok) {
      throw new Error(`Unable to postLogin: error ${response.status}`);
    }

    return response.json() as Promise<LoginResponse>;
  });
};

/**
 * Retrieve a list of stash-tabs from the specified Path of Exile account.
 */
export const getStashTabs = (
  params: QueryFunctionContext<QueryParams<{ league?: string | null }>>,
): Promise<StashTabsResponse> => {
  const [, { accountName, poesessid, token, league }] = params.queryKey;

  if (!accountName || !poesessid || !token || !league) {
    throw new Error(UNDEFINED_VALUES_ERROR_MESSAGE);
  }

  return fetch(`${ENDPOINT}/poe/${accountName}/stash-tabs/?poesessid=${poesessid}&league=${league}&realm=pc`, {
    method: 'GET',
    headers: { ...getAuthorizationHeaders(token) },
  }).then((response) => {
    if (!response.ok) {
      throw new Error(`Unable to retrieve stash-tabs: error ${response.status}`);
    }

    return response.json() as Promise<StashTabsResponse>;
  });
};
