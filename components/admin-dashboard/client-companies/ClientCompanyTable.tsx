'use client'

import { useEffect, useMemo, useRef, useState, useCallback } from 'react'
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
  type MRT_SortingState,
  type MRT_RowVirtualizer,
  MRT_Row,
} from 'material-react-table'
import { Box, IconButton, Tooltip } from '@mui/material'
import { FileDown, Edit, Trash2, Building } from 'lucide-react'
import { mkConfig, generateCsv, download } from 'export-to-csv'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { deleteCompany } from '@/components/actions/companyActions'

type Company = {
  id: number
  company_name: string
  short_name: string
  company_type: string
  branch_office: string
  head_office: string
  address: string
  pincode: string
  mobile_no: string
  alternate_no: string
  landline_no: string
  email_id: string
  web_address: string
  facebook: string
  twitter: string
  linkedin: string
  frn_no: string
  frn_date: string
  client_code_prefix: string
  invoice_prefix: string
  currency: string
  sms_balance: number
  pan_no: string
  gstin: string
  bank_name: string
  branch: string
  account_holder_name: string
  account_no: string
  ifsc_code: string
  bank_pan_no: string
  manager_name: string
  manager_designation: string
  manager_address: string
  manager_dob: string
  manager_contact_no: string
  manager_email_id: string
  incharge_for: string
  membership_no: string
  date_of_admission: string
  date_of_retirement: string
  family_person_name: string
  family_relationship: string
  family_contact_no: string
  family_anniversary_date: string
}

export default function ClientCompanyTable({ initialData }: { initialData: Company[] }) {
  const router = useRouter()
  const [data, setData] = useState<Company[]>(initialData)
  const [isLoading, setIsLoading] = useState(false)
  const [sorting, setSorting] = useState<MRT_SortingState>([])
  const rowVirtualizerInstanceRef = useRef<MRT_RowVirtualizer>(null)

  useEffect(() => {
    try {
      rowVirtualizerInstanceRef.current?.scrollToIndex?.(0)
    } catch (error) {
      console.error(error)
    }
  }, [sorting])

  const handleEditRow = useCallback(
    (row: MRT_Row<Company>) => {
      router.push(`/client-companies/edit/${row.original.id}`)
    },
    [router]
  )

  const handleDeleteRow = useCallback(async (row: MRT_Row<Company>) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete ${row.original.company_name}?`
    )
    if (confirmed) {
      setIsLoading(true)
      try {
        await deleteCompany(row.original.id)
        setData((prevData) => prevData.filter((item) => item.id !== row.original.id))
      } catch (error) {
        console.error('Failed to delete company:', error)
      } finally {
        setIsLoading(false)
      }
    }
  }, [])

  const csvConfig = mkConfig({
    fieldSeparator: ',',
    decimalSeparator: '.',
    useKeysAsHeaders: true,
  })

  const handleExportRows = (rows: MRT_Row<Company>[]) => {
    const rowData = rows.map((row) => {
      const { original } = row
      return Object.fromEntries(
        Object.entries(original).map(([key, value]) => [
          key,
          value === null || value === undefined ? '' : String(value)
        ])
      )
    })
    const csv = generateCsv(csvConfig)(rowData)
    download(csvConfig)(csv)
  }

  const handleExportData = () => {
    const exportData = data.map(item => 
      Object.fromEntries(
        Object.entries(item).map(([key, value]) => [
          key,
          value === null || value === undefined ? '' : String(value)
        ])
      )
    )
    const csv = generateCsv(csvConfig)(exportData)
    download(csvConfig)(csv)
  }

  const columns = useMemo<MRT_ColumnDef<Company>[]>(
    () => [
      {
        id: 'actions',
        header: 'Actions',
        Cell: ({ row }) => (
          <Box sx={{ display: 'flex', gap: '0.5rem' }}>
            <Tooltip title="Edit">
              <IconButton color="primary" onClick={() => handleEditRow(row)}>
                <Edit className="h-4 w-4" />
              </IconButton>
            </Tooltip>
            <Tooltip title="Delete">
              <IconButton color="error" onClick={() => handleDeleteRow(row)}>
                <Trash2 className="h-4 w-4" />
              </IconButton>
            </Tooltip>
          </Box>
        ),
        size: 120,
      },
      {
        accessorKey: 'company_name',
        header: 'Company Name',
        size: 200,
        Cell: ({ renderedCellValue, row }) => (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <Image
              alt="company logo"
              height={30}
              width={30}
              src={`/icons/placeholder.svg?height=30&width=30`}
              loading="lazy"
              style={{ borderRadius: '50%' }}
            />
            <span>{renderedCellValue}</span>
          </Box>
        ),
      },
      {
        accessorKey: 'short_name',
        header: 'Short Name',
        size: 120,
      },
      {
        accessorKey: 'company_type',
        header: 'Company Type',
        size: 150,
      },
      {
        accessorKey: 'branch_office',
        header: 'Branch Office',
        size: 150,
      },
      {
        accessorKey: 'head_office',
        header: 'Head Office',
        size: 150,
      },
      {
        accessorKey: 'address',
        header: 'Address',
        size: 200,
      },
      {
        accessorKey: 'pincode',
        header: 'Pincode',
        size: 100,
      },
      {
        accessorKey: 'mobile_no',
        header: 'Mobile Number',
        size: 120,
      },
      {
        accessorKey: 'alternate_no',
        header: 'Alternate Number',
        size: 120,
      },
      {
        accessorKey: 'landline_no',
        header: 'Landline Number',
        size: 120,
      },
      {
        accessorKey: 'email_id',
        header: 'Email',
        size: 200,
      },
      {
        accessorKey: 'web_address',
        header: 'Website',
        size: 200,
      },
      {
        accessorKey: 'facebook',
        header: 'Facebook',
        size: 150,
      },
      {
        accessorKey: 'twitter',
        header: 'Twitter',
        size: 150,
      },
      {
        accessorKey: 'linkedin',
        header: 'LinkedIn',
        size: 150,
      },
      {
        accessorKey: 'frn_no',
        header: 'FRN Number',
        size: 120,
      },
      {
        accessorKey: 'frn_date',
        header: 'FRN Date',
        size: 120,
      },
      {
        accessorKey: 'client_code_prefix',
        header: 'Client Code Prefix',
        size: 150,
      },
      {
        accessorKey: 'invoice_prefix',
        header: 'Invoice Prefix',
        size: 120,
      },
      {
        accessorKey: 'currency',
        header: 'Currency',
        size: 100,
      },
      {
        accessorKey: 'sms_balance',
        header: 'SMS Balance',
        size: 120,
      },
      {
        accessorKey: 'pan_no',
        header: 'PAN Number',
        size: 120,
      },
      {
        accessorKey: 'gstin',
        header: 'GSTIN',
        size: 150,
      },
      {
        accessorKey: 'bank_name',
        header: 'Bank Name',
        size: 150,
      },
      {
        accessorKey: 'branch',
        header: 'Bank Branch',
        size: 150,
      },
      {
        accessorKey: 'account_holder_name',
        header: 'Account Holder Name',
        size: 200,
      },
      {
        accessorKey: 'account_no',
        header: 'Account Number',
        size: 150,
      },
      {
        accessorKey: 'ifsc_code',
        header: 'IFSC Code',
        size: 120,
      },
      {
        accessorKey: 'bank_pan_no',
        header: 'Bank PAN Number',
        size: 150,
      },
      {
        accessorKey: 'manager_name',
        header: 'Manager Name',
        size: 150,
      },
      {
        accessorKey: 'manager_designation',
        header: 'Manager Designation',
        size: 150,
      },
      {
        accessorKey: 'manager_address',
        header: 'Manager Address',
        size: 200,
      },
      {
        accessorKey: 'manager_dob',
        header: 'Manager DOB',
        size: 120,
      },
      {
        accessorKey: 'manager_contact_no',
        header: 'Manager Contact',
        size: 150,
      },
      {
        accessorKey: 'manager_email_id',
        header: 'Manager Email',
        size: 200,
      },
      {
        accessorKey: 'incharge_for',
        header: 'In Charge For',
        size: 150,
      },
      {
        accessorKey: 'membership_no',
        header: 'Membership Number',
        size: 150,
      },
      {
        accessorKey: 'date_of_admission',
        header: 'Date of Admission',
        size: 150,
      },
      {
        accessorKey: 'date_of_retirement',
        header: 'Date of Retirement',
        size: 150,
      },
      {
        accessorKey: 'family_person_name',
        header: 'Family Person Name',
        size: 200,
      },
      {
        accessorKey: 'family_relationship',
        header: 'Family Relationship',
        size: 150,
      },
      {
        accessorKey: 'family_contact_no',
        header: 'Family Contact',
        size: 150,
      },
      {
        accessorKey: 'family_anniversary_date',
        header: 'Family Anniversary',
        size: 150,
      },
    ],
    [handleEditRow, handleDeleteRow]
  )

  const table = useMaterialReactTable({
    columns,
    data,
    enableRowSelection: true,
    enableStickyHeader: true,
    enableStickyFooter: true,
    enablePagination: true,
    muiTableContainerProps: { 
      sx: { 
        maxHeight: 'calc(100vh - 200px)',
        overflow: 'auto',
      } 
    },
    muiTablePaperProps: {
      sx: { boxShadow: 'none' },
    },
    onSortingChange: setSorting,
    state: { isLoading, sorting },
    rowVirtualizerInstanceRef,
    rowVirtualizerOptions: { overscan: 5 },
    columnVirtualizerOptions: { overscan: 2 },
    renderTopToolbarCustomActions: ({ table }) => (
      <div className="flex gap-2 flex-wrap">
        <Button variant="outline" size="sm" onClick={handleExportData}>
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
        address: false,
        alternate_no: false,
        landline_no: false,
        facebook: false,
        twitter: false,
        linkedin: false,
        frn_date: false,
        client_code_prefix: false,
        invoice_prefix: false,
        currency: false,
        sms_balance: false,
        bank_name: false,
        branch: false,
        account_holder_name: false,
        account_no: false,
        ifsc_code: false,
        bank_pan_no: false,
        manager_address: false,
        manager_dob: false,
        incharge_for: false,
        membership_no: false,
        date_of_admission: false,
        date_of_retirement: false,
        family_person_name: false,
        family_relationship: false,
        family_contact_no: false,
        family_anniversary_date: false,
      },
    },
  })

  return (
    <div className="flex flex-col h-full space-y-4">
      <div className="flex justify-between items-center">
        <Button
          onClick={() => router.push('/client-companies/add')}
          className="bg-blue-600 hover:bg-blue-700 text-white"
        >
          <Building className="mr-2 h-4 w-4" />
          Add New Company
        </Button>
      
      </div>

      <div className="flex-1 overflow-hidden rounded-md border">
        <MaterialReactTable table={table} />
      </div>
    </div>
  )
}