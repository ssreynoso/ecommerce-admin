'use client'

import {
    ColumnDef,
    flexRender,
    SortingState,
    ColumnFiltersState,
    VisibilityState,
    getCoreRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    getFilteredRowModel,
    useReactTable,
} from '@tanstack/react-table'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { forwardRef, useImperativeHandle, useState } from 'react'
import { DataTablePagination } from './pagination'
import { DataTableViewOptions } from './view-options'

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
    // Opciones
    viewOptions?: boolean
    viewRowSelection?: boolean
    viewRowsPerPage?: boolean
}

// Qué cosas se pueden hacer con la referencia del componente
export type TableHandle<T> = {
    filterByColumn: (columnKey: keyof T, value: string) => void
}

export const getDataTable = <T, V>() => forwardRef<TableHandle<T>, DataTableProps<T, V>>((props, ref) => {
    const { columns, data, viewOptions, viewRowSelection, viewRowsPerPage } = props

    const [ sorting,          setSorting          ] = useState<SortingState>([])
    const [ columnFilters,    setColumnFilters    ] = useState<ColumnFiltersState>([])
    const [ columnVisibility, setColumnVisibility ] = useState<VisibilityState>({})
    const [ rowSelection,     setRowSelection     ] = useState({})

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel         : getCoreRowModel(),
        getPaginationRowModel   : getPaginationRowModel(),
        getSortedRowModel       : getSortedRowModel(),
        getFilteredRowModel     : getFilteredRowModel(),
        onColumnFiltersChange   : setColumnFilters,
        onSortingChange         : setSorting,
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange    : setRowSelection,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
        },
    })

    useImperativeHandle(ref, () => ({
        filterByColumn: (columnKey: keyof T, value: string) => {
            table.getColumn(columnKey as string)?.setFilterValue(value)
        }
    }))

    // Usage
    // export type EntityTable = { ... }
    // ...
    // import { TableHandle, getDataTable } from '@/components/data-table'
    // ...
    // const tableRef = useRef<TableHandle<EntityTable>>(null)
    // const DataTable = getDataTable<EntityTable, EntityTable[]>()

    return (
        <div>
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id}>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(header.column.columnDef.header, header.getContext())}
                                        </TableHead>
                                    )
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="h-24 text-center">
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            <div className='flex items-center justify-end gap-6'>
                <DataTablePagination
                    table            = { table }
                    viewRowSelection = { viewRowSelection }
                    viewRowsPerPage  = { viewRowsPerPage }
                />
                { viewOptions &&
                    <DataTableViewOptions table={table} />
                }
            </div>
        </div>
    )
})

// const InternalComponent = forwardRef<TableHandle<DataType>, DataTableProps<DataType, ValueType>>((props, ref) => {
