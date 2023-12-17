"use client";
import React from "react";
import Link from "next/link";
import { Layout } from "@progressteaching/lightning-components";
import { Button, DataTable, Input, TableColumn } from "@masud-nt1/mint-ui";
import { CrossCircledIcon } from "@radix-ui/react-icons";
import { Dummy } from "@needglobal/needui";

const school = {
  name: "School Name",
};

interface DataRow {
  title: string;
  year: string;
}
const columns: TableColumn<DataRow>[] = [
  {
    name: "Title",
    selector: (row) => row.title,
    sortable: true,
  },
  {
    name: "Year",
    selector: (row) => row.year,
    sortable: true,
  },
];

const tabledata = [
  {
    id: 1,
    title: "Beetlejuice",
    year: "1988",
  },
  {
    id: 2,
    title: "Ghostbusters",
    year: "1984",
  },
];

const Table = () => {
  const [selectedRows, setSelectedRows] = React.useState([]);
  const [toggleCleared, setToggleCleared] = React.useState(false);
  const [data, setData] = React.useState(tabledata);

  const handleRowSelected = React.useCallback((state: any) => {
    setSelectedRows(state.selectedRows);
  }, []);

  const contextActions = React.useMemo(() => {
    const handleDelete = () => {
      if (
        window.confirm(
          `Are you sure you want to delete:\r ${selectedRows.map(
            (r) => r.title
          )}?`
        )
      ) {
        setToggleCleared(!toggleCleared);
        // setData(differenceBy(data, selectedRows, 'title'));
      }
    };

    return (
      <Button
        key="delete"
        onClick={handleDelete}
        // style={{ backgroundColor: "red" }}
        icon
      >
        Delete
      </Button>
    );
  }, [data, selectedRows, toggleCleared]);
  return (
    <Layout
      LinkRenderer={Link}
      userMenu={{
        name: "John Doe",
        navs: [
          { title: "One", href: "/" },
          { title: "One", href: "/" },
          { title: "One", href: "/" },
        ],
      }}
      items={[{ title: "home", href: "/" }]}
      school={school}
    >
      <DataTable
        columns={columns}
        data={data}
        pagination={true}
        selectableRows
        title="user Table"
        contextActions={contextActions}
        onSelectedRowsChange={handleRowSelected}
        clearSelectedRows={toggleCleared}
        subHeader
        subHeaderComponent={<Input />}
      />
      <Dummy />
    </Layout>
  );
};

export default Table;
{
  /* <DataTable columns={columns} data={data} /> */
}
