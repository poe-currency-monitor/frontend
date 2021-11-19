import { StashTab, Item } from './poe.interfaces';

/**
 * API response from `/auth` endpoint.
 */
export type LoginResponse = {
  token: string;
  accountName: string;
};

export type StashTabsResponse = {
  accountName: string;
  tabs: {
    numTabs: number;
    tabs: StashTab[];
  };
};

export type StashTabsItemsResponse = {
  accountName: string;
  items: {
    [tabId: string]: {
      tabIndex: number;
      items: Item[];
    };
  };
};
