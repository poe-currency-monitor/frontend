import { StashTab, PricedItem } from './poe.interfaces';

export type ProfileTab = {
  id: string;
  name: string;
  type: string;
};

export type Profile = {
  name: string;
  league: string;
  tabs: ProfileTab[];
  snapshots: Snapshot[];
};

export type Snapshot = {
  /**
   * Date string to ISO format.
   */
  date: string;
  stashTabs: StashTab[];
  // TODO: keep track of what stash-tab does the item comes from.
  items: PricedItem[];
};
