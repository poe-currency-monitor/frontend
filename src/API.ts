import { LoginResponse } from './interfaces/api.interfaces';

const ENDPOINT = import.meta.env.PROD ? 'https://totominc.io/api' : 'http://localhost:4000/api';

const DEFAULT_HEADERS = {
  'Content-Type': 'application/json',
};

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
