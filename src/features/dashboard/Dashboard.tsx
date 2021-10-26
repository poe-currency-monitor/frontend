import * as React from 'react';

import { UserContext } from '../../contexts/UserContext';
import { PricedItemsTable } from '../../components/PricedItemsTable';

export const Dashboard: React.FC = () => {
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
    <section className="max-w-5xl pt-8 mx-auto">
      <h1 className="mb-6 leading-tight text-3xl font-bold">Dashboard</h1>

      {/* TODO: let user select a specific stash-tab */}
      <PricedItemsTable className="p-6 rounded-md bg-zinc-700" tabs={tabs} items={user.stashTabsItems}>
        <h1 className="mb-4 leading-tight text-2xl font-bold">Stash-tabs overview</h1>
      </PricedItemsTable>
    </section>
  );
};
