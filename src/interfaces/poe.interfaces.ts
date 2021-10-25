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

type ItemRequirement = {
  displayMode: number;
  name: string;
  values: [string, number][];
};

type ItemSocket = {
  group: number;
  attr: string;
  sColour: string;
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
  id: string;
  inventoryId: string;
  verified: boolean;
  name: string;
  typeLine: string;
  frameType: number;
  baseType: string;
  descrText: string;
  flavourText: string[];
  league: string;
  identified: boolean;
  ilvl: number;
  stackSize: number;
  maxStackSize: number;
  corrupted?: boolean;
  w: number;
  h: number;
  x: number;
  y: number;
  icon: string;
  artFilename: string;
  properties: ItemProperty[];
  explicitMods: string[];
  implicitMods?: string[];
  enchantMods?: string[];
  craftedMods?: string[];
  utilityMods?: string[];
  requirements?: ItemRequirement[];
  sockets?: ItemSocket[];
  scourgeMods?: string[];
  sourged?: {
    tier: number;
  };
};

/**
 * Type of the `tabsItems` in the UserContext. The key is the `id` of a
 * `StashTab`.
 */
export type StashTabsItems = { [key: string]: Item[] };
