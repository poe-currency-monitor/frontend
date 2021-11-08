import * as React from 'react';

import { priceStashTabsItems } from '../../lib/item-pricing';
import { UserContext } from '../../contexts/UserContext';
import { RatesContext } from '../../contexts/RatesContext';
import { Layout } from '../../components/Layout';
import { DashboardItemsTable } from './DashboardItemsTable';

/**
 * View component for the `/dashboard` route.
 */
export const Dashboard: React.FC = () => {
  const user = React.useContext(UserContext);
  const rates = React.useContext(RatesContext);

  // On component mounted, create a snapshot of the user's stash.
  React.useEffect(() => {
    if (user.currentProfile) {
      const snapshots = user.currentProfile.snapshots;
      const date = new Date().toISOString();

      user.currentProfile.snapshots = [
        ...snapshots,
        {
          date,
          stashTabs: user.stashTabs,
          items: priceStashTabsItems(user.stashTabsItems, rates),
        },
      ];
    }
  }, []);

  return (
    <Layout>
      <h1 className="mb-6 leading-tight text-3xl font-bold">Dashboard</h1>

      <DashboardItemsTable />
    </Layout>
  );
};
