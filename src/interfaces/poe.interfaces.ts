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
