import { ItemWorth } from './calculations.interfaces';

export type Snapshot = {
  dateUTC: string;
  items: ItemWorth[];
};
