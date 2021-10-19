type LeagueRule = {
  id: string;
  name: string;
  description: string;
};

export type League = {
  id: string;
  realm: string;
  url: string;
  startAt?: string;
  endAt?: string | null;
  description: string;
  registerAt?: string;
  delveEvent: boolean;
  rules: LeagueRule[];
};
