export type ProfileTab = {
  id: string;
  name: string;
  type: string;
};

export type Profile = {
  name: string;
  league: string;
  tabs: ProfileTab[];
};
