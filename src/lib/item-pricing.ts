import { Item } from '../interfaces/poe.interfaces';
import { RatesContextType } from '../contexts/RatesContext';

export type PricedItem = {
  unit: number;
  total: number;
};

/**
 * Try to price a Path of Exile item.
 *
 * @param item Path of Exile item.
 * @param rates Currency and items rates fetched from poe.ninja.
 * @returns A priced item object in chaos equivalent.
 */
export function priceItem(item: Item, rates: RatesContextType): PricedItem {
  const itemValue = {
    unit: 0,
    total: 0,
  };

  if (rates.currencyRates && item.frameType === 5) {
    const currencyRate = rates.currencyRates.lines.find((line) => line.currencyTypeName === item.typeLine);

    if (currencyRate) {
      itemValue.unit = currencyRate.chaosEquivalent;
      itemValue.total = currencyRate.chaosEquivalent * (item.stackSize || 1);
    }
  }

  return itemValue;
}