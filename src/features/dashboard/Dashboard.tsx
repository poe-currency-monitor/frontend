import * as React from 'react';

import { UserContext } from '../../contexts/UserContext';
import { PricedItemsTable } from '../../components/PricedItemsTable';

export const Dashboard: React.FC = () => {
  const user = React.useContext(UserContext);

  const tabsIds = React.useMemo(() => Object.keys(user.stashTabsItems), [user.stashTabsItems]);
  const tabsItems = React.useMemo(() => user.stashTabsItems[tabsIds[0]] || [], [tabsIds, user.stashTabsItems]);

  return (
    <section className="max-w-5xl pt-8 mx-auto">
      <h1 className="mb-6 leading-tight text-3xl font-bold">Dashboard</h1>

      {/* TODO: let user select a specific stash-tab */}
      <PricedItemsTable items={tabsItems}>
        <h1 className="mb-4 leading-tight text-2xl font-bold">Stash-tabs overview</h1>
      </PricedItemsTable>
    </section>
  );
};
