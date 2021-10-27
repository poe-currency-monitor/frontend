import * as React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from '@material-ui/core';

import { Item, StashTab, StashTabsItems } from '../interfaces/poe.interfaces';
import { RatesContext } from '../contexts/RatesContext';
import { PricedItem, priceItem } from '../lib/item-pricing';
import { Input } from './ui/Input';
import { MultiSelect, MultiSelectOption, MultiSelectOptions } from './ui/MultiSelect';

export type PricedItemsTableProps = {
  className?: string;
  tabs: StashTab[];
  items: StashTabsItems;
};

export type PricedItemsTableFormattedItem = Item & {
  tabId: string;
  price: PricedItem;
  imageUrl: string;
};

export const PricedItemsTable: React.FC<PricedItemsTableProps> = ({ children, className, tabs, items }) => {
  const rates = React.useContext(RatesContext);

  const [selectedTabs, setSelectedTabs] = React.useState<string[]>([]);
  const [search, setSearch] = React.useState('');
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

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

      <TableContainer className="rounded-md bg-blue-gray-700" classes={{ root: 'mb-4 bg-slate-100' }}>
        <Table size="medium">
          <TableHead>
            <TableRow>
              <TableCell className="!font-inter !font-semibold !border-blue-gray-500 !text-blue-gray-200" width="64px">
                Icon
              </TableCell>

              <TableCell className="!font-inter !font-semibold !border-blue-gray-500 !text-blue-gray-200">
                Item name
              </TableCell>

              <TableCell className="!font-inter !font-semibold !border-blue-gray-500 !text-blue-gray-200" align="right">
                Quantity
              </TableCell>

              <TableCell className="!font-inter !font-semibold !border-blue-gray-500 !text-blue-gray-200" align="right">
                Item level / tier
              </TableCell>

              <TableCell className="!font-inter !font-semibold !border-blue-gray-500 !text-blue-gray-200" align="right">
                Sockets
              </TableCell>

              <TableCell className="!font-inter !font-semibold !border-blue-gray-500 !text-blue-gray-200" align="right">
                Unit price (in chaos)
              </TableCell>

              <TableCell className="!font-inter !font-semibold !border-blue-gray-500 !text-blue-gray-200" align="right">
                Total value (in chaos)
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {filteredItems.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
              <TableRow key={row.id}>
                <TableCell className="!font-inter !font-normal !border-blue-gray-600">
                  <img className="h-6 w-auto" src={row.imageUrl} alt="" />
                </TableCell>

                <TableCell className="!font-inter !border-blue-gray-500 !text-blue-gray-200">
                  {row.typeLine || row.baseType}
                </TableCell>

                <TableCell className="!font-inter !border-blue-gray-500 !text-blue-gray-200" align="right">
                  {row.stackSize || 1}
                </TableCell>

                <TableCell
                  className={`!font-inter !border-blue-gray-500 ${row.ilvl ? '!text-blue-gray-200' : '!text-gray-500'}`}
                  align="right"
                >
                  {row.ilvl || 'N/A'}
                </TableCell>

                <TableCell
                  className={`!font-inter !border-blue-gray-500 ${row.ilvl ? '!text-blue-gray-200' : '!text-gray-500'}`}
                  align="right"
                >
                  {row.sockets ? row.sockets.length : 'N/A'}
                </TableCell>

                <TableCell className="!font-inter !font-medium !border-blue-gray-500 !text-orange-800" align="right">
                  {(Math.round(row.price.unit * 100) / 100).toFixed(2)}
                </TableCell>

                <TableCell className="!font-inter !font-medium !border-blue-gray-500 !text-orange-800" align="right">
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
          root: 'rounded-md bg-slate-100',
          caption: '!font-inter',
          input: '!font-inter',
        }}
        count={filteredItems.length}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10, 25, 50]}
        onRowsPerPageChange={handleChangeRowsPerPage}
        onPageChange={handleChangePage}
      />
    </div>
  );
};
