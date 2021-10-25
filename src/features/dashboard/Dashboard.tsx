import * as React from 'react';

import { UserContext } from '../../contexts/UserContext';
import { PricedItemsTable } from '../../components/PricedItemsTable';

export const Dashboard: React.FC = () => {
  const user = React.useContext(UserContext);

  return (
    <section className="max-w-5xl pt-8 mx-auto">
      <h1 className="mb-6 leading-tight text-3xl font-bold">Dashboard</h1>

      {/* TODO: let user select a specific stash-tab */}
      <PricedItemsTable className="p-6 rounded-md bg-zinc-700" items={user.stashTabsItems}>
        <h1 className="mb-4 leading-tight text-2xl font-bold">Stash-tabs overview</h1>
      </PricedItemsTable>
    </section>
  );
};
