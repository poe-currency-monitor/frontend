const ENDPOINT = 'http://localhost:4201/api';
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
  characters: {
    name: string;
    league: string;
    classId: number;
    ascendancyClass: number;
    class: string;
    level: number;
    experience: number;
  }[];
};

export type StashTabsResponse = {
  accountName: string;
  tabs: {
    numTabs: number;
    tabs: {
      n: string;
      i: number;
      id: string;
      type: string;
      selected: boolean;
      srcL: string;
      srcC: string;
      srcR: string;
      colour: {
        r: number;
        g: number;
        b: number;
      };
    }[];
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
