"use client";

import { useEffect, useMemo, useRef, useState, useCallback } from "react";
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
  type MRT_SortingState,
  type MRT_RowVirtualizer,
  MRT_Row,
} from "material-react-table";
import { Box, IconButton, Tooltip } from "@mui/material";
import { FileDown, Edit, Trash2, UserPlus } from "lucide-react";
import { mkConfig, generateCsv, download } from "export-to-csv";
import { makeData, type Person } from "@/components/shared/makeData";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";

const AddStaffTable = () => {
  const router = useRouter();
  const [data, setData] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [sorting, setSorting] = useState<MRT_SortingState>([]);
  
  const rowVirtualizerInstanceRef = useRef<MRT_RowVirtualizer>(null);

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

  const handleEditRow = useCallback((row: MRT_Row<Person>) => {
    router.push(`/edit-staff?id=${row.original.staffId}`);
  }, [router]);

  const handleDeleteRow = (row: MRT_Row<Person>) => {
    const confirmed = window.confirm(`Are you sure you want to delete ${row.original.firstName} ${row.original.lastName}?`);
    if (confirmed) {
      setData((prevData) => prevData.filter(item => item.staffId !== row.original.staffId));
    }
  };

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

  const columns = useMemo<MRT_ColumnDef<Person>[]>(() => [
    {
      id: 'actions',
      header: 'Actions',
      Cell: ({ row }) => (
        <Box sx={{ display: 'flex', gap: '0.5rem' }} >
          <Tooltip title="Edit">
            <IconButton
              color="primary"
              onClick={() => handleEditRow(row)}
            >
              <Edit className="h-4 w-4" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete">
            <IconButton
              color="error"
              onClick={() => handleDeleteRow(row)}
            >
              <Trash2 className="h-4 w-4" />
            </IconButton>
          </Tooltip>
        </Box>
      ),
      size: 120,
    },
    {
      accessorFn: (row) => `${row.firstName} ${row.lastName}`,
      id: "name",
      header: "Name",
      size: 250,
      Cell: ({ renderedCellValue, row }) => (
        <Box sx={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <Image
            alt="avatar"
            height={30}
            width={30}
            src={row.original.avatar}
            loading="lazy"
            style={{ borderRadius: "50%" }}
          />
          <span>{renderedCellValue}</span>
        </Box>
      ),
    },
    {
      accessorKey: "staffId",
      header: "Staff ID",
      size: 100,
    },
    {
      accessorKey: "email",
      header: "Email Address",
      size: 200,
    },
    {
      accessorKey: "phone",
      header: "Phone Number",
      size: 120,
    },
    {
      accessorKey: "gender",
      header: "Gender",
      size: 100,
    },
    {
      accessorKey: "alternateNumber",
      header: "Alternate Number",
      size: 120,
    },
    {
      accessorKey: "role",
      header: "Role",
      size: 100,
    },
    {
      accessorKey: "designation",
      header: "Designation",
      size: 150,
    },
  ], [handleEditRow]);

  const table = useMaterialReactTable({
    columns,
    data,
    enableRowSelection: true,
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
        email: false,
        alternateNumber: false,
        gender: false,
      },
    },
  });

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        {/* <h1 className="text-2xl font-bold">Staff Management</h1> */}
        <Button
          onClick={() => router.push("/add-staffs")}
          className="bg-blue-600 hover:bg-blue-700 text-white"
        >
          <UserPlus className="mr-2 h-4 w-4" />
          Add New Staff
        </Button>
      </div>

      <div className="rounded-md border">
        <MaterialReactTable table={table} />
      </div>
    </div>
  );
};

export default AddStaffTable;