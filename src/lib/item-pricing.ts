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

  // Price a common currency item.
  if (rates.currencyRates && item.frameType === 5) {
    const currencyRate = rates.currencyRates.lines.find((line) => line.currencyTypeName === item.typeLine);

    if (currencyRate) {
      itemValue.unit = currencyRate.chaosEquivalent;
      itemValue.total = currencyRate.chaosEquivalent * (item.stackSize || 1);
    } else if (item.typeLine === 'Chaos Orb') {
      itemValue.unit = 1;
      itemValue.total = item.stackSize || 0;
    }
  }

  // Price an essence currency item.
  if (rates.essenceRates && item.frameType === 5) {
    const essenceRate = rates.essenceRates.lines.find((line) => line.name === item.typeLine);

    if (essenceRate) {
      itemValue.unit = essenceRate.chaosValue;
      itemValue.total = essenceRate.chaosValue * (item.stackSize || 1);
    }
  }

  // Price a card item.
  if (rates.divinationCardRates && item.frameType === 6) {
    const cardRate = rates.divinationCardRates.lines.find((line) => line.name === item.typeLine);

    if (cardRate) {
      itemValue.unit = cardRate.chaosValue;
      itemValue.total = cardRate.chaosValue * (item.stackSize || 1);
    }
  }

  // Price a fragment item.
  if (rates.fragmentRates && (item.frameType === 5 || item.frameType === 0)) {
    const fragmentRate = rates.fragmentRates.lines.find((line) => line.currencyTypeName === item.typeLine);

    if (fragmentRate) {
      itemValue.unit = fragmentRate.chaosEquivalent;
      itemValue.total = fragmentRate.chaosEquivalent * (item.stackSize || 1);
    }
  }

  // Price a scarab fragment item.
  if (rates.scarabRates && item.frameType === 0) {
    const scarabRate = rates.scarabRates.lines.find((line) => line.name === item.typeLine);

    if (scarabRate) {
      itemValue.unit = scarabRate.chaosValue;
      itemValue.total = scarabRate.chaosValue * (item.stackSize || 1);
    }
  }

  return itemValue;
}
