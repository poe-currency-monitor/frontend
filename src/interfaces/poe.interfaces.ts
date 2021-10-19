type LeagueRule = {
  id: string;
  name: string;
  description: string;
};

type ItemProperty = {
  name: string;
  values: [[string, number]];
  displayMode: number;
  type: number;
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

export type StashTab = {
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
};

export type Item = {
  baseType: string;
  verified: boolean;
  w: number;
  h: number;
  icon: string;
  stackSize: number;
  maxStackSize: number;
  league: string;
  id: string;
  name: string;
  typeLine: string;
  identified: boolean;
  ilvl: number;
  properties: ItemProperty[];
  explicitMods: string[];
  descrText: string;
  frameType: number;
  x: number;
  y: number;
  inventoryId: string;
  flavourText: string[];
  artFilename: string;
};
