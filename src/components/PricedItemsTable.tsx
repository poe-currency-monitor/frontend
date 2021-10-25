import * as React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from '@material-ui/core';

import { Item } from '../interfaces/poe.interfaces';
import { RatesContext } from '../contexts/RatesContext';
import { PricedItem, priceItem } from '../lib/item-pricing';

export type PricedItemsTableProps = {
  items: Item[];
};

export type PricedItemsTableFormattedItem = Item & {
  price: PricedItem;
  imageUrl: string;
};

export const PricedItemsTable: React.FC<PricedItemsTableProps> = ({ children, items }) => {
  const rates = React.useContext(RatesContext);

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const formattedItems = React.useMemo<PricedItemsTableFormattedItem[]>(() => {
    return items.map((item) => {
      const price = priceItem(item, rates);

      return {
        ...item,
        price,
        imageUrl: item.icon.split('?')[0],
      };
    });
  }, [items, rates]);

  const handleChangeRowsPerPage: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10) || 10);
    setPage(0);
  };

  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null, newPage: number) => {
    setPage(newPage);
  };

  return (
    <div>
      {children}

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
            {formattedItems.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
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
        count={formattedItems.length}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10, 25, 50]}
        onRowsPerPageChange={handleChangeRowsPerPage}
        onPageChange={handleChangePage}
      />
    </div>
  );
};
