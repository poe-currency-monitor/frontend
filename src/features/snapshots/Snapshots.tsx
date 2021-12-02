import * as React from 'react';
import { format } from 'date-fns';
import { TrashIcon } from '@heroicons/react/outline';

import { Snapshot } from '../../interfaces/profile.interfaces';
import { UserContext } from '../../contexts/UserContext';
import { Layout } from '../../components/Layout';

export const Snapshots: React.FC = () => {
  const user = React.useContext(UserContext);

  const orderedSnapshots = React.useMemo(
    () =>
      user.currentProfile
        ? user.currentProfile.snapshots.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        : [],
    [user.currentProfile],
  );

  const getSnapshotWorth = (snapshot: Snapshot): number =>
    snapshot.items.reduce((a, b) => {
      // eslint-disable-next-line no-param-reassign
      a += b.price.total;

      return Math.round(a * 100) / 100;
    }, 0);

  const handleSnapshot = (snapshot: Snapshot): void => {
    console.log('>> Snapshot:', snapshot);
  };

  const handleDeleteSnapshot = (snapshot: Snapshot): void => {
    if (user.currentProfile) {
      // Find the snapshot index to remove by its date.
      const snapshotIndexToRemove = user.currentProfile.snapshots.findIndex((s) => s.date === snapshot.date);

      if (snapshotIndexToRemove > -1) {
        user.setCurrentProfile({
          ...user.currentProfile,
          snapshots: [...user.currentProfile.snapshots.filter((_, i) => i !== snapshotIndexToRemove)],
        });
      }
    }
  };

  return (
    <Layout>
      <h1 className="mb-6 leading-tight text-3xl font-bold">Manage snapshots</h1>

      <p className="max-w-lg mb-8 text-lg font-medium">
        Manage the snapshots of your current profile and get a detailed view of each snapshot by cliking on it.
      </p>

      {!user.currentProfile || user.currentProfile.snapshots.length === 0 ? (
        <p>You don&apos;t have any snapshot.</p>
      ) : (
        <ul className="flex flex-col space-y-4 max-w-xl mx-auto">
          {orderedSnapshots.map((snapshot, i) => (
            <li key={snapshot.date} className="flex items-center justify-between rounded-md bg-gray-700 transition">
              <button
                type="button"
                className="group flex flex-grow items-center h-full pl-6 py-4 cursor-pointer hover"
                onClick={() => handleSnapshot(snapshot)}
              >
                <div className="mr-6">
                  <span className="text-3xl font-bold text-gray-300 group-hover:text-gray-400 transition">
                    #{i + 1}
                  </span>
                </div>

                <div className="flex flex-col items-start">
                  <p className="mb-1 text-lg font-medium text-gray-200 group-hover:text-gray-400 transition">
                    {format(new Date(snapshot.date), 'yyyy-MM-dd, HH:mm:ss')}
                  </p>

                  <p className="text-base text-gray-300 group-hover:text-gray-400 transition">
                    {getSnapshotWorth(snapshot).toFixed(2)} chaos
                  </p>
                </div>
              </button>

              <button
                type="button"
                className="flex items-center justify-center w-12 h-full pr-6 cursor-pointer text-gray-300 hover:text-gray-400 transition"
                onClick={() => handleDeleteSnapshot(snapshot)}
              >
                <TrashIcon className="h-6 w-auto" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </Layout>
  );
};
