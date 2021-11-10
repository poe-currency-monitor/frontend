import * as React from 'react';
import { ClockIcon } from '@heroicons/react/solid';

import { priceStashTabsItems } from '../../lib/item-pricing';
import { UserContext } from '../../contexts/UserContext';
import { RatesContext } from '../../contexts/RatesContext';
import { Layout } from '../../components/Layout';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
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

      <div className="flex flex-row-reverse mb-4">
        <Button variant="secondary" className="flex flex-row" type="button">
          <ClockIcon className="h-4 w-auto mr-2" />
          {user.currentProfile?.snapshots.length || 0} snapshots
        </Button>
      </div>

      <div className="mb-6 flex justify-between">
        <Card title="Total value" badge="All tabs">
          <div className="flex items-baseline text-white">
            <p className="mr-3 text-5xl font-black tracking-tighter leading-tight">1,234</p>
            <p className="text-lg font-medium">chaos</p>
          </div>
        </Card>

        <Card title="Chaos per hour">
          <div className="flex items-baseline text-white">
            <p className="mr-3 text-5xl font-black tracking-tighter leading-tight">154</p>
            <p className="text-lg font-medium">chaos/hour</p>
          </div>
        </Card>
      </div>

      <DashboardItemsTable />
    </Layout>
  );
};
