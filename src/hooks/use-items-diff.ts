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

  const newItems = useMemo(() => newValueFlat.filter((nv) => !oldValueFlat.includes(nv)), [newValueFlat, oldValueFlat]);

  const newStackSizeItems = useMemo(
    () =>
      newValueFlat
        .filter((nv) => {
          // Items that are both in `newValue` and `oldValue`.
          const intersectionItems = oldValueFlat.filter((ov) => nv.id === ov.id);

          return intersectionItems.filter((ii) => nv.stackSize > ii.stackSize);
        })
        // Substract `newValue` stack-size minus `oldValue` stack-size to get
        // the stack-size diff between the 2 values.
        .map((nv) => {
          const oldValueMatching = oldValueFlat.find((ov) => nv.id === ov.id);

          if (!oldValueMatching) {
            return nv;
          }

          return {
            ...nv,
            stackSize: nv.stackSize - oldValueMatching.stackSize,
          };
        }),
    [newValueFlat, oldValueFlat],
  );

  const itemsDiff = useMemo(() => [...newItems, ...newStackSizeItems], [newItems, newStackSizeItems]);

  return itemsDiff;
}
