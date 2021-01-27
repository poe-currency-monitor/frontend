import { useMemo } from 'react';

import { ItemWorth } from '../../interfaces/calculations.interfaces';
import { Item } from '../../interfaces/poe.interfaces';
import { useCalculateCurrencyWorth } from './use-calculate-currency-worth';

// Include currency, fragments.
const CURRENCY_FRAME_TYPE = 5;

export type UseCalculateWorthReturnType = {
  currencyItemsWorth: ItemWorth[];
};

/**
 * Calculate the net worth of stash-tabs items.
 *
 * @param items Items from stash-tabs API endpoint.
 */
export function useCalculateWorth(items: { [key: string]: Item[] }): UseCalculateWorthReturnType {
  const flatItems = useMemo(() => Object.values(items).flatMap((itemArray) => itemArray), [items]);

  const currencyItems = useMemo(() => flatItems.filter((item) => item.frameType === CURRENCY_FRAME_TYPE), [flatItems]);

  const currencyItemsWorth = useCalculateCurrencyWorth(currencyItems);

  return { currencyItemsWorth };
}
