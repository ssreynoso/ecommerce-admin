'use client'

import { ColumnDef } from '@tanstack/react-table'
import { Button } from '@/components/ui/button'
import { DataTableColumnHeader } from '@/components/data-table/column-header'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { IconKeys, getIcon } from '@/icons/icons'
import Image from 'next/image'
import { CopyIcon } from '@radix-ui/react-icons'


export type AgentsTable = {
    id: string
    name: string
    status: string
    description: string
    datasource: string | null
}

const options: { label: string, icon: IconKeys }[] = [
    { label: 'WhatsApp', icon: 'WA' },
    { label: 'Facebook', icon: 'FB' },
    { label: 'Instragram', icon: 'IG' },
    { label: 'Telegram', icon: 'TL' },
]


// eslint-disable-next-line @typescript-eslint/no-unused-vars
const actions = (
    editRow: (row: AgentsTable) => void,
    deleteRow: (row: AgentsTable) => void,
    handleAcceptAction: (option: { label: string, icon: IconKeys }) => void,
    handleCodeSnippet: () => void
) => {
    const actions: ColumnDef<AgentsTable> = {
        id: 'actions',
        cell: ({ row }) => {
            // En row.original tengo los datos de la fila. Los originales je
            const agent = row.original

            return (
                <div className='ml-auto max-w-min flex gap-2 justify-end'>
                    <Button variant='outline' onClick={() => editRow(agent)}>Editar</Button>
                    <Button variant='outline' onClick={() => deleteRow(agent)}>Eliminar</Button>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant='outline'>Implementar en</Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            { options.map((option) => (
                                <DropdownMenuItem key={option.label} onClick={() => handleAcceptAction(option)}>
                                    <div className="flex items-center gap-2 w-full">
                                        <div className='h-4 w-4 flex items-center justify-center relative'>
                                            <Image className="object-contain" fill src={getIcon(option.icon)} alt="channel icon" />
                                        </div>
                                        <p>{option.label}</p>
                                    </div>
                                </DropdownMenuItem>
                            )) }
                            <DropdownMenuItem onClick={handleCodeSnippet}>
                                <div className="flex items-center gap-2 w-full">
                                    <CopyIcon className="h-4 w-4" />
                                    <p>Code Snippet</p>
                                </div>
                            </DropdownMenuItem>
                            {/* <DropdownMenuItem>Asignar Segmento</DropdownMenuItem>
                            <DropdownMenuItem>Editar Segmento</DropdownMenuItem>
                            <DropdownMenuItem>Borrar Usuario</DropdownMenuItem> */}
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            )
        },
    }
    return actions
}

const name: ColumnDef<AgentsTable> = {
    accessorKey: 'name',
    header: ({ column }) => {
        return (
            // <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
            //     Email
            //     <ArrowUpDown className="ml-2 h-4 w-4" />
            // </Button>
            <DataTableColumnHeader column={column} title="Nombre" />
        )
    },
}

export const getColumns = (
    editRow: (row: AgentsTable) => void,
    deleteRow: (row: AgentsTable) => void,
    handleAcceptAction: (option: { label: string, icon: IconKeys }) => void,
    handleCodeSnippet: () => void
) => {
    return [
        { accessorKey: 'id', header: 'ID' }, 
        name, 
        { accessorKey: 'status', header: 'Estado' }, 
        { accessorKey: 'description', header: 'Descripción' }, 
        { accessorKey: 'datasource', header: 'Data Source' }, 
        actions(editRow, deleteRow, handleAcceptAction, handleCodeSnippet),
    ] as ColumnDef<AgentsTable>[]
}