import React, { useState, useMemo } from 'react';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Pagination } from "@nextui-org/react";

// Utility function to retrieve key values dynamically
const getKeyValue = (item, key) => item[key];

const DataTable = ({ data }) => {
  const [page, setPage] = useState(1);
  const rowsPerPage = 10; // Adjust this number based on performance needs
  const totalPages = Math.ceil(data.length / rowsPerPage);

  // Memoize the current data slice for efficient re-rendering
  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    return data.slice(start, end);
  }, [page, data]);

  const columns = [
    { key: "id", label: "BUS ID" },
    // { key: "latitude", label: "LATITUDE" },
    // { key: "longitude", label: "LONGITUDE" },
    { key: "routeId", label: "ROUTE ID" },
    { key: "tripId", label: "TRIP ID" },
  ];

  return (
    <Table
      selectionMode="single" 
      color="secondary"
      aria-label="Bus Data Table with pagination"
      bottomContent={
        <div className="flex w-full justify-center">
          <Pagination
            isCompact
            showControls
            showShadow
            color="secondary"
            page={page}
            total={totalPages}
            onChange={(page) => setPage(page)}
          />
        </div>
      }
      classNames={{
        wrapper: "min-h-[222px]", // Adjust the min height if needed
      }}
      isStriped
      style={{ width: 500 }}
    >
      <TableHeader columns={columns}>
        {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
      </TableHeader>
      <TableBody  emptyContent={"API Data Loading ..."} items={items}>
        {(item) => (
          <TableRow key={item.id}>
            {columns.map((column) => (
              <TableCell key={column.key}>{getKeyValue(item, column.key)}</TableCell>
            ))}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default DataTable;
