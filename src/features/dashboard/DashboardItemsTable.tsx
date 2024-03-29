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

  return <PricedItemsTable tabs={tabs} items={user.stashTabsItems} />;
};
