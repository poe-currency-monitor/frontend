import * as React from 'react';

import { UserContext } from '../../contexts/UserContext';
import { PricedItemsTable } from '../../components/PricedItemsTable';

/**
 * Display a `PricedItemsTable` for the selected profile and stash-tabs.
 */
export const DashboardItemsTable: React.FC = () => {
  const user = React.useContext(UserContext);

  // Only allow selected tabs in the current profile.
  const tabs = React.useMemo(() => {
    if (user.currentProfile) {
      const currentProfileTabsIds = user.currentProfile.tabs.map((tab) => tab.id);

      return user.stashTabs.filter((tab) => currentProfileTabsIds.includes(tab.id));
    }

    return [];
  }, [user.currentProfile, user.stashTabs]);

  return (
    <PricedItemsTable className="p-6 rounded-md bg-zinc-700" tabs={tabs} items={user.stashTabsItems}>
      <h1 className="mb-4 leading-tight text-2xl font-bold">Stash-tabs overview</h1>
    </PricedItemsTable>
  );
};
