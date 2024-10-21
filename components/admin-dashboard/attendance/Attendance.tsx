"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
  type MRT_SortingState,
  MRT_Row,
  MRT_RowVirtualizer,
} from "material-react-table";
import { FileDown } from "lucide-react";
import { mkConfig, generateCsv, download } from "export-to-csv";
import { makeData, type Person } from "./makeData";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

const Attendance = () => {
  const router = useRouter();

  const columns = useMemo<MRT_ColumnDef<Person>[]>(
    () => [
      {
        accessorKey: "staffId",
        header: "Staff ID",
        size: 100,
      },
      {
        accessorKey: "name",
        header: "Name",
        size: 240,
        Cell: ({ row }: { row: MRT_Row<Person> }) => (
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 text-sm font-medium">
              {row.original.firstName[0]}
              {row.original.lastName[0]}
            </div>
            <span>
              {row.original.firstName} {row.original.lastName}
            </span>
          </div>
        ),
      },
      {
        accessorKey: "designation",
        header: "Designation",
        size: 300,
      },
      {
        accessorKey: "role",
        header: "Role",
      },
      {
        accessorKey: "status",
        header: "Status",
        Cell: ({ row }: { row: MRT_Row<Person> }) => (
          <span
            className={`${
              row.original.status === "On Time"
                ? "bg-green-100 text-green-600"
                : row.original.status === "Late"
                ? "bg-red-100 text-red-600"
                : "bg-gray-100 text-gray-600"
            } rounded-full px-2 py-1 text-xs font-medium`}
          >
            {row.original.status}
          </span>
        ),
      },
    ],
    []
  );

  const csvConfig = mkConfig({
    fieldSeparator: ",",
    decimalSeparator: ".",
    useKeysAsHeaders: true,
  });

  const handleExportRows = (rows: MRT_Row<Person>[]) => {
    const rowData = rows.map((row) => row.original);
    const csv = generateCsv(csvConfig)(rowData);
    download(csvConfig)(csv);
  };

  const handleExportData = () => {
    const csv = generateCsv(csvConfig)(data);
    download(csvConfig)(csv);
  };

  const rowVirtualizerInstanceRef = useRef<MRT_RowVirtualizer>(null);
  const [data, setData] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [sorting, setSorting] = useState<MRT_SortingState>([]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setData(makeData(100));
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    try {
      rowVirtualizerInstanceRef.current?.scrollToIndex?.(0);
    } catch (error) {
      console.error(error);
    }
  }, [sorting]);

  const table = useMaterialReactTable({
    columns,
    data,
    enableStickyHeader: true,
    enableStickyFooter: true,
    enablePagination: true,
    muiTableContainerProps: { sx: { maxHeight: "calc(100vh - 200px)" } },
    onSortingChange: setSorting,
    state: { isLoading, sorting },
    rowVirtualizerInstanceRef,
    rowVirtualizerOptions: { overscan: 5 },
    columnVirtualizerOptions: { overscan: 2 },
    renderTopToolbarCustomActions: ({ table }) => (
      <div className="flex gap-2 flex-wrap">
        <Button
          variant="outline"
          size="sm"
          onClick={handleExportData}
        >
          <FileDown className="mr-2 h-4 w-4" />
          Export All Data
        </Button>
        <Button
          variant="outline"
          size="sm"
          disabled={table.getPrePaginationRowModel().rows.length === 0}
          onClick={() => handleExportRows(table.getPrePaginationRowModel().rows)}
        >
          <FileDown className="mr-2 h-4 w-4" />
          Export All Rows
        </Button>
        <Button
          variant="outline"
          size="sm"
          disabled={table.getRowModel().rows.length === 0}
          onClick={() => handleExportRows(table.getRowModel().rows)}
        >
          <FileDown className="mr-2 h-4 w-4" />
          Export Page Rows
        </Button>
        <Button
          variant="outline"
          size="sm"
          disabled={!table.getIsSomeRowsSelected() && !table.getIsAllRowsSelected()}
          onClick={() => handleExportRows(table.getSelectedRowModel().rows)}
        >
          <FileDown className="mr-2 h-4 w-4" />
          Export Selected Rows
        </Button>
      </div>
    ),
    initialState: {
      columnVisibility: {
        // Adjust column visibility as needed
      },
    },
  });

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
      </div>

      <div className="rounded-md border">
        <MaterialReactTable table={table} />
      </div>
    </div>
  );
};

export default Attendance;