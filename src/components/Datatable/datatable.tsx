"use client";
import React from "react";
import CDataTable, {
  TableProps,
  TableColumn,
} from "react-data-table-component";
import { ArrowDownIcon } from "@radix-ui/react-icons";

const sortIcon = <ArrowDownIcon />;
const selectProps = {
  indeterminate: (isIndeterminate: boolean) => isIndeterminate,
};

function DataTable<T>(props: TableProps<T>): JSX.Element {
  return <CDataTable pagination dense {...props} />;
}

export { DataTable, type TableColumn };
