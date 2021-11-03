import * as React from 'react';

import { Layout } from '../../components/Layout';
import { DashboardItemsTable } from './DashboardItemsTable';

/**
 * View component for the `/dashboard` route.
 */
export const Dashboard: React.FC = () => {
  return (
    <Layout>
      <h1 className="mb-6 leading-tight text-3xl font-bold">Dashboard</h1>

      <DashboardItemsTable />
    </Layout>
  );
};
