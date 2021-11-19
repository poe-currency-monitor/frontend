import * as React from 'react';
import { ClockIcon, PlusCircleIcon } from '@heroicons/react/solid';

import { StashTabsItems } from '../../interfaces/poe.interfaces';
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

  const snapshotsAmount = React.useMemo(
    () => user.currentProfile?.snapshots.length || 0,
    [user.currentProfile?.snapshots],
  );

  // Filter stash-tabs with with tabs selected from the current-profile.
  const filteredStashTabsItems = React.useMemo<StashTabsItems>(() => {
    const filteredTabs = Object.keys(user.stashTabsItems).filter((tabId) =>
      user.currentProfile?.tabs.find((tab) => tab.id === tabId),
    );

    return filteredTabs.reduce((acc, tabId) => {
      return {
        ...acc,
        [tabId]: user.stashTabsItems[tabId],
      };
    }, {});
  }, [user.stashTabsItems, user.currentProfile]);

  const pricedItems = React.useMemo(() => priceStashTabsItems(filteredStashTabsItems, rates), [filteredStashTabsItems]);

  const totalPrice = React.useMemo(() => pricedItems.reduce((acc, item) => acc + item.price.total, 0), [pricedItems]);

  const createSnapshot = () => {
    if (user.currentProfile) {
      const date = new Date().toISOString();

      user.setCurrentProfile({
        ...user.currentProfile,
        snapshots: [
          ...user.currentProfile.snapshots,
          {
            date,
            stashTabs: user.stashTabs,
            items: priceStashTabsItems(user.stashTabsItems, rates),
          },
        ],
      });
    }
  };

  // On component mounted, create a snapshot of the user's stash.
  React.useEffect(() => createSnapshot(), []);

  const handleCreateSnapshot: React.MouseEventHandler = () => {
    createSnapshot();
  };

  return (
    <Layout>
      <h1 className="mb-6 leading-tight text-3xl font-bold">Dashboard</h1>

      <div className="flex flex-row-reverse mb-4">
        <Button variant="primary" className="flex flex-row ml-2" type="button" onClick={handleCreateSnapshot}>
          <PlusCircleIcon className="h-4 w-auto mr-2" />
          Create a snapshot
        </Button>

        <Button variant="secondary" className="flex flex-row" type="button">
          <ClockIcon className="h-4 w-auto mr-2" />
          {snapshotsAmount} snapshot{snapshotsAmount > 1 ? 's' : ''}
        </Button>
      </div>

      <div className="mb-6 flex justify-evenly">
        <Card title="Total value" badge="All tabs">
          <div className="flex items-baseline text-white">
            <p className="mr-3 text-5xl font-black tracking-tighter leading-tight">
              {(Math.round(totalPrice * 100) / 100).toFixed(2)}
            </p>

            <p className="text-lg font-medium">chaos</p>
          </div>
        </Card>

        <Card title="Income per hour">
          <div className="flex items-baseline text-white">
            <p className="mr-3 text-5xl font-black tracking-tighter leading-tight">0</p>
            <p className="text-lg font-medium">chaos/hour</p>
          </div>
        </Card>
      </div>

      <DashboardItemsTable />
    </Layout>
  );
};
