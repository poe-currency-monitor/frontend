import { useContext, useMemo } from 'react';

import { ItemWorth } from '../../interfaces/calculations.interfaces';
import { Item } from '../../interfaces/poe.interfaces';
import { RatesContext } from '../../contexts/RatesContext';

/**
 * Calculate net-worth of currency-items.
 *
 * @param items Stash-tabs items.
 */
export function useCalculateCurrencyWorth(items: Item[]): ItemWorth[] {
  const { currencyRates, fragmentRates } = useContext(RatesContext);

  const filteredItems = useMemo(() => items.filter((item) => !item.typeLine.includes('Shard')), [items]);

  const rates = useMemo(
    () => (currencyRates && fragmentRates ? [...currencyRates.lines, ...fragmentRates.lines] : []),
    [currencyRates, fragmentRates],
  );

  const worth = useMemo<ItemWorth[]>(
    () =>
      filteredItems.map((item) => {
        const rate = rates.find((r) => r.currencyTypeName === item.typeLine);

        const payload: ItemWorth = {
          name: rate ? rate.currencyTypeName : item.typeLine,
          quantity: item.stackSize || 1,
          image: item.icon,
          chaosEquivalent: rate ? Math.floor((item.stackSize || 1) * rate.chaosEquivalent * 100) / 100 : 0,
          rate: rate ? Math.floor(rate.chaosEquivalent * 100) / 100 : 0,
        };

        if (item.typeLine === 'Chaos Orb') {
          payload.chaosEquivalent = item.stackSize;
          payload.rate = 1;
        }

        return payload;
      }),
    [filteredItems, rates],
  );

  return worth;
}
