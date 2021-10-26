import * as React from 'react';

import { DashboardItemsTable } from './DashboardItemsTable';

/**
 * View component for the `/dashboard` route.
 */
export const Dashboard: React.FC = () => {
  return (
    <section className="max-w-5xl pt-8 mx-auto">
      <h1 className="mb-6 leading-tight text-3xl font-bold">Dashboard</h1>

      <DashboardItemsTable />
    </section>
  );
};
