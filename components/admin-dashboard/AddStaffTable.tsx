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
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";

// Define the Staff type based on your backend data structure
type Staff = {
  staff_id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  gender: string;
  alternate_number: string | null;
  roleId: number;
  designation: string;
  documents_collected: boolean;
  isVerified: boolean;
};

const AddStaffTable = ({ initialData }: { initialData: Staff[] }) => {
  const router = useRouter();
  const [data, setData] = useState<Staff[]>(initialData);
  const [isLoading] = useState(false);
  const [sorting, setSorting] = useState<MRT_SortingState>([]);
  
  const rowVirtualizerInstanceRef = useRef<MRT_RowVirtualizer>(null);

  useEffect(() => {
    try {
      rowVirtualizerInstanceRef.current?.scrollToIndex?.(0);
    } catch (error) {
      console.error(error);
    }
  }, [sorting]);

  const handleEditRow = useCallback((row: MRT_Row<Staff>) => {
    router.push(`/edit-staff?id=${row.original.staff_id}`);
  }, [router]);

  const handleDeleteRow = (row: MRT_Row<Staff>) => {
    const confirmed = window.confirm(`Are you sure you want to delete ${row.original.first_name} ${row.original.last_name}?`);
    if (confirmed) {
      setData((prevData) => prevData.filter(item => item.staff_id !== row.original.staff_id));
    }
  };

  const csvConfig = mkConfig({
    fieldSeparator: ",",
    decimalSeparator: ".",
    useKeysAsHeaders: true,
  });

  const handleExportRows = (rows: MRT_Row<Staff>[]) => {
    const rowData = rows.map((row) => row.original);
    const csv = generateCsv(csvConfig)(rowData);
    download(csvConfig)(csv);
  };

  const handleExportData = () => {
    const csv = generateCsv(csvConfig)(data);
    download(csvConfig)(csv);
  };

  const columns = useMemo<MRT_ColumnDef<Staff>[]>(() => [
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
      accessorFn: (row) => `${row.first_name} ${row.last_name}`,
      id: "name",
      header: "Name",
      size: 250,
      Cell: ({ renderedCellValue }) => (
        <Box sx={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <Image
            alt="avatar"
            height={30}
            width={30}
            src={`/placeholder.svg?height=30&width=30`}
            loading="lazy"
            style={{ borderRadius: "50%" }}
          />
          <span>{renderedCellValue}</span>
        </Box>
      ),
    },
    {
      accessorKey: "staff_id",
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
      accessorKey: "alternate_number",
      header: "Alternate Number",
      size: 120,
    },
    {
      accessorKey: "roleId",
      header: "Role ID",
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
        alternate_number: false,
        gender: false,
      },
    },
  });

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
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