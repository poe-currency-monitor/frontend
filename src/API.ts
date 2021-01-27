import { Character, StashTab, Item } from './interfaces/poe.interfaces';
import { AllCurrencyRatesResponse, AllItemRatesResponse } from './interfaces/poe-ninja.interfaces';

const ENDPOINT =
  process.env.NODE_ENV === 'production' ? 'https://poecurrencymonitor.cf/api' : 'http://localhost:4201/api';

const DEFAULT_HEADERS = {
  'Content-Type': 'application/json',
};

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

export type LoginResponse = {
  token: string;
  accountName: string;
};

export type CharactersResponse = {
  accountName: string;
  characters: Character[];
};

export type StashTabsResponse = {
  accountName: string;
  tabs: {
    numTabs: number;
    tabs: StashTab[];
  };
};

export type StashTabsItemsResponse = {
  accountName: string;
  items: {
    [key: string]: {
      tabIndex: number;
      items: Item[];
    };
  };
};

/**
 * Login a user with a POESESSID.
 *
 * @param poesessid Path of Exile session ID.
 */
export const postLogin = (poesessid: string): Promise<LoginResponse> =>
  fetch(`${ENDPOINT}/auth/`, {
    method: 'POST',
    headers: { ...DEFAULT_HEADERS },
    body: JSON.stringify({ poesessid }),
  }).then((response) => {
    if (!response.ok) {
      throw new Error(`Unable to login: error ${response.status}`);
    }

    return response.json() as Promise<LoginResponse>;
  });

/**
 * Retrieve a list of character from the specified Path of Exile account.
 *
 * @param poesessid Path of Exile session ID.
 * @param token JWT.
 * @param accountName Path of Exile account-name.
 */
export const getCharacters = (poesessid: string, token: string, accountName: string): Promise<CharactersResponse> =>
  fetch(`${ENDPOINT}/poe/${accountName}/characters/?poesessid=${poesessid}`, {
    method: 'GET',
    headers: { ...getAuthorizationHeaders(token) },
  }).then((response) => {
    if (!response.ok) {
      throw new Error(`Unable to retrieve characters: error ${response.status}`);
    }

    return response.json() as Promise<CharactersResponse>;
  });

/**
 * Retrieve a list of stash-tabs from the specified Path of Exile account.
 *
 * @param poesessid Path of Exile session ID.
 * @param token JWT.
 * @param accountName Path of Exile account-name.
 * @param league Path of Exile character league.
 */
export const getStashTabs = (
  poesessid: string,
  token: string,
  accountName: string,
  league: string,
): Promise<StashTabsResponse> =>
  fetch(`${ENDPOINT}/poe/${accountName}/stash-tabs/?poesessid=${poesessid}&league=${league}&realm=pc`, {
    method: 'GET',
    headers: { ...getAuthorizationHeaders(token) },
  }).then((response) => {
    if (!response.ok) {
      throw new Error(`Unable to retrieve stash-tabs: error ${response.status}`);
    }

    return response.json() as Promise<StashTabsResponse>;
  });

/**
 * Retrieve all currency-rates from poe.ninja API.
 *
 * @param token JWT.
 * @param league Path of Exile character league.
 */
export const getAllCurrencyRates = (token: string, league: string): Promise<AllCurrencyRatesResponse> =>
  fetch(`${ENDPOINT}/poe-ninja/all-currency-rates/?league=${league}&language=en`, {
    method: 'GET',
    headers: { ...getAuthorizationHeaders(token) },
  }).then((response) => {
    if (!response.ok) {
      throw new Error(`Unable to retrieve all currency-rates: error ${response.status}`);
    }

    return response.json() as Promise<AllCurrencyRatesResponse>;
  });

/**
 * Retrieve all item-rates from poe.ninja API.
 *
 * @param token JWT.
 * @param league Path of Exile character league.
 */
export const getAllItemRates = (token: string, league: string): Promise<AllItemRatesResponse> =>
  fetch(`${ENDPOINT}/poe-ninja/all-item-rates/?league=${league}&language=en`, {
    method: 'GET',
    headers: { ...getAuthorizationHeaders(token) },
  }).then((response) => {
    if (!response.ok) {
      throw new Error(`Unable to retrieve all item-rates: error ${response.status}`);
    }

    return response.json() as Promise<AllItemRatesResponse>;
  });

/**
 * Retrieve all stash-tabs items from a Path of Exile account.
 *
 * @param poesessid Path of Exile session ID.
 * @param token JWT.
 * @param accountName Path of Exile account-name.
 * @param league Path of Exile character league.
 * @param tabIndexes Stash-tabs indexes.
 */
export const getStashTabsItems = (
  poesessid: string,
  token: string,
  accountName: string,
  league: string,
  tabIndexes: string,
): Promise<StashTabsItemsResponse> =>
  fetch(
    `${ENDPOINT}/poe/${accountName}/stash-items/?poesessid=${poesessid}&league=${league}&realm=pc&tabIndex=${tabIndexes}`,
    {
      method: 'GET',
      headers: { ...getAuthorizationHeaders(token) },
    },
  ).then((response) => {
    if (!response.ok) {
      throw new Error(`Unable to retrieve all stash-tabs items: error ${response.status}`);
    }

    return response.json() as Promise<StashTabsItemsResponse>;
  });
