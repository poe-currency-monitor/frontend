const ENDPOINT = 'http://localhost:4201/api';
const DEFAULT_HEADERS = {
  'Content-Type': 'application/json',
};

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
