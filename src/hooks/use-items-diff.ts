import { useMemo } from 'react';

import { Item } from '../interfaces/poe.interfaces';

/**
 * Find the diff between 2 arrays of items. Detect new items and items that
 * have an increased stack-size by matching them with their `id`.
 *
 * **Warning:** an item that is un-stacked or moved can have a different `id`.
 *
 * @param newValue Most recent stash-tabs items API endpoint value.
 * @param oldValue Older stash-tabs items API endpoint value.
 */
export function useItemsDiff(newValue: { [key: string]: Item[] }, oldValue: { [key: string]: Item[] }): Item[] {
  const newValueFlat = useMemo(() => Object.values(newValue).flatMap((e) => e), [newValue]);
  const oldValueFlat = useMemo(() => Object.values(oldValue).flatMap((e) => e), [oldValue]);

  const newItems = useMemo(
    () =>
      newValueFlat.length && oldValueFlat.length
        ? newValueFlat.filter((_nv) => oldValueFlat.findIndex((_ov) => _ov.id === _nv.id) === -1)
        : [],
    [newValueFlat, oldValueFlat],
  );

  const newStackSizeItems = useMemo(() => {
    if (newValueFlat.length && oldValueFlat.length) {
      // Intersection items are items that are both present between in the
      // new-value and old-value.
      const intersectionItems = newValueFlat.filter((_nv) => oldValueFlat.findIndex((_ov) => _nv.id === _ov.id) > -1);

      // Intersection items that have a greater stack-size in their new-value
      // than their old-value.
      const intersectionItemsWithGreaterStackSize = intersectionItems.filter((ii) => {
        // The old value item should always be found due to array filter above.
        // However with TypeScript, we always handle the `undefined` case.
        const ov = oldValueFlat.find((_ov) => ii.id === _ov.id);

        return ov ? ii.stackSize > ov.stackSize : false;
      });

      // Re-write the `stackSize` value of an intersection item with a greater
      // stack-size to always return the difference between the new stack-size
      // value and the old stack-size value.
      const formattedItemsWithNewStackSize = intersectionItemsWithGreaterStackSize.map((nv) => {
        // The old value item should always be found due to array filter above.
        // However with TypeScript, we always handle the `undefined` case.
        const ov = oldValueFlat.find((_ov) => nv.id === _ov.id);

        return !ov
          ? nv
          : {
              ...nv,
              stackSize: nv.stackSize - ov.stackSize,
            };
      });

      return formattedItemsWithNewStackSize;
    }

    return [];
  }, [newValueFlat, oldValueFlat]);

  const itemsDiff = useMemo(() => [...newItems, ...newStackSizeItems], [newItems, newStackSizeItems]);

  return itemsDiff;
}
