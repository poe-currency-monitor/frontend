export type ProfileTab = {
  id: string;
  name: string;
  type: string;
};

export type Profile = {
  league: string;
  tabs: ProfileTab[];
};
