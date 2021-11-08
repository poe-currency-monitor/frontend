import * as React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
} from '@material-ui/core';

import { ItemPrice } from '../interfaces/item-pricing.interfaces';
import { Item, StashTab, StashTabsItems } from '../interfaces/poe.interfaces';
import { RatesContext } from '../contexts/RatesContext';
import { priceItem } from '../lib/item-pricing';
import { Input } from './ui/Input';
import { MultiSelect, MultiSelectOption, MultiSelectOptions } from './ui/MultiSelect';

export type PricedItemsTableProps = {
  className?: string;
  tabs: StashTab[];
  items: StashTabsItems;
};

export type PricedItemsTableFormattedItem = Item & {
  tabId: string;
  price: ItemPrice;
  imageUrl: string;
};

enum OrderBy {
  Name = 'item-name',
  Quantity = 'quantity',
  ItemLevel = 'ilvl',
  UnitPrice = 'unit-price',
  TotalValue = 'total-value',
}

/**
 * A function that compares 2 items with the properties from `OrderBy` enum.
 *
 * @param a First item to compare
 * @param b Second item to compare
 * @param orderBy Property to use to compare items.
 */
function descendingComparator(a: PricedItemsTableFormattedItem, b: PricedItemsTableFormattedItem, orderBy: OrderBy) {
  if (orderBy === OrderBy.Name) {
    return (a.typeLine || a.baseType).localeCompare(b.typeLine || b.baseType);
  }

  if (orderBy === OrderBy.Quantity) {
    return b.stackSize - a.stackSize;
  }

  if (orderBy === OrderBy.ItemLevel) {
    return b.ilvl - a.ilvl;
  }

  if (orderBy === OrderBy.UnitPrice || orderBy === OrderBy.TotalValue) {
    const aValue = orderBy === OrderBy.UnitPrice ? a.price.unit : a.price.total;
    const bValue = orderBy === OrderBy.UnitPrice ? b.price.unit : b.price.total;

    if (aValue < bValue) {
      return -1;
    }

    if (aValue > bValue) {
      return 1;
    }
  }

  return 0;
}

/**
 * Call `descendingComparator` with positive or negative depending on `order`.
 *
 * @param a First item to compare
 * @param b Second item to compare
 * @param order Ordering key
 * @param orderBy Property to use to compare items.
 */
function getComparator(
  a: PricedItemsTableFormattedItem,
  b: PricedItemsTableFormattedItem,
  order: 'asc' | 'desc',
  orderBy: OrderBy,
) {
  return order === 'desc' ? descendingComparator(a, b, orderBy) : -descendingComparator(a, b, orderBy);
}

export const PricedItemsTable: React.FC<PricedItemsTableProps> = ({ children, className, tabs, items }) => {
  const rates = React.useContext(RatesContext);

  const [selectedTabs, setSelectedTabs] = React.useState<string[]>([]);
  const [search, setSearch] = React.useState('');
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [orderBy, setOrderBy] = React.useState<OrderBy>(OrderBy.TotalValue);
  const [order, setOrder] = React.useState<'asc' | 'desc'>('asc');

  const tabsOptions = React.useMemo<MultiSelectOption[]>(
    () => tabs.map((tab) => ({ label: tab.n, value: tab.id })),
    [tabs],
  );

  // Format all items from `{ [tabId: string]: Item[] }` into `Item[]` but keep
  // a reference to the item stash-tab ID so we can filter it later.
  const formattedItems = React.useMemo<PricedItemsTableFormattedItem[]>(() => {
    const allStashTabsItems: PricedItemsTableFormattedItem[] = [];

    Object.entries(items)
      .filter(([tabId]) => tabs.find((tab) => tab.id === tabId))
      .forEach(([tabId, tabItems]) => {
        tabItems.forEach((item) => {
          const price = priceItem(item, rates);

          allStashTabsItems.push({
            ...item,
            tabId,
            price,
            imageUrl: item.icon.split('?')[0],
          });
        });
      });

    return allStashTabsItems;
  }, [rates, items, tabs]);

  // Advanced filtering stuff goes here, filter items from search input.
  const filteredItems = React.useMemo<PricedItemsTableFormattedItem[]>(() => {
    const searchMatchedItems = search
      ? formattedItems.filter((item) => `${item.baseType} ${item.name}`.toLowerCase().includes(search.toLowerCase()))
      : formattedItems;

    const tabsMatchedItems =
      selectedTabs.length > 0
        ? searchMatchedItems.filter((item) => selectedTabs.includes(item.tabId))
        : searchMatchedItems;

    return tabsMatchedItems;
  }, [formattedItems, search, selectedTabs]);

  // After advanced item filtering, sort the items.
  const sortedItems = React.useMemo<PricedItemsTableFormattedItem[]>(
    () => filteredItems.sort((a, b) => getComparator(a, b, order, orderBy)),
    [filteredItems, order, orderBy],
  );

  const handleChangeRowsPerPage: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10) || 10);
    setPage(0);
  };

  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null, newPage: number) => {
    setPage(newPage);
  };

  const handleSearchOnChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    setSearch(event.target.value);
    setPage(0);
  };

  const handleTabsChange = (options: MultiSelectOptions) => {
    if (options.length) {
      setSelectedTabs([...options.map((option) => option.value)]);
    } else {
      setSelectedTabs([]);
    }

    setPage(0);
  };

  const handleSortChange = (property: OrderBy): void => {
    const isAsc = orderBy === property && order === 'asc';

    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
    setPage(0);
  };

  return (
    <div className={className}>
      {children}

      <div className="flex w-full space-x-4">
        <Input
          labelClassName="w-1/2"
          htmlFor="search"
          type="text"
          placeholder="Filter by item name..."
          onChange={handleSearchOnChange}
        />

        <MultiSelect
          options={tabsOptions}
          placeholder="Filter by stash-tab..."
          onChange={handleTabsChange}
          className="w-1/2"
        />
      </div>

      <TableContainer className="mb-4 rounded-md !bg-gray-700">
        <Table size="medium">
          <TableHead>
            <TableRow className=" !bg-gray-700">
              <TableCell
                className="!px-4 !py-3 !leading-none !font-inter !font-semibold !border-gray-600 !text-gray-200"
                width="64px"
              >
                Icon
              </TableCell>

              <TableCell
                className="!px-4 !py-3 !leading-none !font-inter !font-semibold !border-gray-600"
                sortDirection={orderBy === OrderBy.Name ? order : false}
              >
                <TableSortLabel
                  className="!text-gray-200"
                  active={orderBy === OrderBy.Name}
                  direction={orderBy === OrderBy.Name ? order : 'asc'}
                  onClick={() => handleSortChange(OrderBy.Name)}
                >
                  Item name
                </TableSortLabel>
              </TableCell>

              <TableCell
                className="!px-4 !py-3 !leading-none !font-inter !font-semibold !border-gray-600"
                align="right"
                sortDirection={orderBy === OrderBy.Quantity ? order : false}
              >
                <TableSortLabel
                  className="!text-gray-200"
                  active={orderBy === OrderBy.Quantity}
                  direction={orderBy === OrderBy.Quantity ? order : 'asc'}
                  onClick={() => handleSortChange(OrderBy.Quantity)}
                >
                  Quantity
                </TableSortLabel>
              </TableCell>

              <TableCell
                className="!px-4 !py-3 !leading-none !font-inter !font-semibold !border-gray-600"
                align="right"
                sortDirection={orderBy === OrderBy.ItemLevel ? order : false}
              >
                <TableSortLabel
                  className="!text-gray-200"
                  active={orderBy === OrderBy.ItemLevel}
                  direction={orderBy === OrderBy.ItemLevel ? order : 'asc'}
                  onClick={() => handleSortChange(OrderBy.ItemLevel)}
                >
                  Item level / tier
                </TableSortLabel>
              </TableCell>

              <TableCell
                className="!px-4 !py-3 !leading-none !font-inter !font-semibold !border-gray-600 !text-gray-200"
                align="right"
              >
                Sockets
              </TableCell>

              <TableCell
                className="!px-4 !py-3 !leading-none !font-inter !font-semibold !border-gray-600"
                align="right"
                sortDirection={orderBy === OrderBy.UnitPrice ? order : false}
              >
                <TableSortLabel
                  className="!text-gray-200"
                  active={orderBy === OrderBy.UnitPrice}
                  direction={orderBy === OrderBy.UnitPrice ? order : 'asc'}
                  onClick={() => handleSortChange(OrderBy.UnitPrice)}
                >
                  Unit price
                </TableSortLabel>
              </TableCell>

              <TableCell
                className="!px-4 !py-3 !leading-none !font-inter !font-semibold !border-gray-600"
                align="right"
                sortDirection={orderBy === OrderBy.TotalValue ? order : false}
              >
                <TableSortLabel
                  className="!text-gray-200"
                  active={orderBy === OrderBy.TotalValue}
                  direction={orderBy === OrderBy.TotalValue ? order : 'asc'}
                  onClick={() => handleSortChange(OrderBy.TotalValue)}
                >
                  Total value
                </TableSortLabel>
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {sortedItems.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
              <TableRow key={row.id}>
                <TableCell className="!font-inter !font-normal !border-gray-600">
                  <img className="h-6 w-auto" src={row.imageUrl} alt="" />
                </TableCell>

                <TableCell className="!font-inter !border-gray-600 !text-gray-200">
                  {row.typeLine || row.baseType}
                </TableCell>

                <TableCell className="!font-inter !font-medium !border-gray-600 !text-gray-200" align="right">
                  {row.stackSize || 1}
                </TableCell>

                <TableCell
                  className={`!font-inter !border-gray-600 ${row.ilvl ? '!text-gray-200' : '!text-gray-400'}`}
                  align="right"
                >
                  {row.ilvl || 'N/A'}
                </TableCell>

                <TableCell
                  className={`!font-inter !border-gray-600 ${row.ilvl ? '!text-gray-200' : '!text-gray-400'}`}
                  align="right"
                >
                  {row.sockets ? row.sockets.length : 'N/A'}
                </TableCell>

                <TableCell className="!font-inter !font-medium !border-gray-600 !text-orange-400" align="right">
                  {(Math.round(row.price.unit * 100) / 100).toFixed(2)}
                </TableCell>

                <TableCell className="!font-inter !font-medium !border-gray-600 !text-orange-400" align="right">
                  {(Math.round(row.price.total * 100) / 100).toFixed(2)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        component="div"
        classes={{
          root: 'rounded-md !bg-gray-700 !text-gray-200',
          caption: '!font-inter',
          input: '!font-inter',
        }}
        count={sortedItems.length}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10, 25, 50]}
        onRowsPerPageChange={handleChangeRowsPerPage}
        onPageChange={handleChangePage}
      />
    </div>
  );
};
