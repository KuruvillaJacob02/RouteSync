import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, getKeyValue } from "@nextui-org/react";

const BusDataTable = ({ data }) => {
  const columns = [
    {
      key: "id",
      label: "BUS ID",
    },
    // {
    //   key: "licensePlate",
    //   label: "LICENSE PLATE",
    // },
    {
      key: "latitude",
      label: "LATITUDE",
    },
    {
      key: "longitude",
      label: "LONGITUDE",
    },
    // {
    //   key: "speed",
    //   label: "SPEED",
    // },
    {
      key: "routeId",
      label: "ROUTE ID", // Add Route ID column
    },
    {
      key: "tripId",
      label: "TRIP ID",  // Add Trip ID column
    },
  ];

  return (
    <Table isStriped aria-label="Bus Data Table" style={{width:500}}>
      <TableHeader columns={columns}>
        {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
      </TableHeader>
      <TableBody items={data}>
        {(item) => (
          <TableRow key={item.id}>
            {(columnKey) => <TableCell>{getKeyValue(item, columnKey)}</TableCell>}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default BusDataTable;
