import { createContext } from 'react';

import { Snapshot } from '../interfaces/snapshot.interfaces';

export type SnapshotContextType = {
  snapshots: Snapshot[];
  setSnapshots: (value: Snapshot[]) => unknown;
};

export const SnapshotContext = createContext<SnapshotContextType>({
  snapshots: [],
  setSnapshots: () => null,
});
