type Property = {
  name: string;
  values: [[string, number]];
  displayMode: number;
  type: number;
};

export type Character = {
  name: string;
  league: string;
  classId: number;
  ascendancyClass: number;
  class: string;
  level: number;
  experience: number;
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
  properties: Property[];
  explicitMods: string[];
  descrText: string;
  frameType: number;
  x: number;
  y: number;
  inventoryId: string;
  flavourText: string[];
  artFilename: string;
};
