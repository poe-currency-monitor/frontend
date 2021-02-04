import React, { useMemo } from 'react';
import { Table } from 'antd';
import { ColumnsType } from 'antd/es/table';

import { ItemWorth } from '../interfaces/calculations.interfaces';

export type ItemsWorthTableProps = {
  items: ItemWorth[];
};

export const ItemsWorthTable: React.FC<ItemsWorthTableProps> = ({ items }) => {
  const columns = useMemo<ColumnsType<ItemWorth>>(
    () => [
      {
        title: '',
        dataIndex: 'image',
        key: 'image',
        render: (image: string) => <img className="block w-5 h-5" src={image} alt="" />,
      },
      {
        title: 'Item Name',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: 'Total Chaos Value',
        dataIndex: 'chaosEquivalent',
        key: 'chaosEquivalent',
        defaultSortOrder: 'descend',
        sorter: (a, b) => a.chaosEquivalent - b.chaosEquivalent,
      },
      {
        title: 'Chaos Rate',
        dataIndex: 'rate',
        key: 'rate',
        sorter: (a, b) => a.rate - b.rate,
      },
      {
        title: 'Quantity',
        dataIndex: 'quantity',
        key: 'quantity',
        sorter: (a, b) => a.quantity - b.quantity,
      },
    ],
    [],
  );

  const dataSource = useMemo<ItemWorth[]>(() => items, [items]);

  const isLoading = useMemo(() => !items || items.length < 1, [items]);

  return <Table columns={columns} dataSource={dataSource} loading={isLoading} size="small" />;
};
