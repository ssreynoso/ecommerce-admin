'use client'

import React from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Store } from '@prisma/client'
import { CheckIcon, ChevronsUpDownIcon, PlusCircleIcon, StoreIcon } from 'lucide-react'

import { useStoreModal } from '@/hooks/use-store-modal'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator } from './ui/command'

type PopoverTriggerProps = React.ComponentPropsWithoutRef<typeof PopoverTrigger>

interface StoreSwitcherProps extends PopoverTriggerProps {
    className?: string
    items: Store[]
}

export const StoreSwitcher = ({ className, items = [] }: StoreSwitcherProps) => {
    const storeModal = useStoreModal()
    const params = useParams()
    const router = useRouter()

    const formattedItems = items.map((store) => ({
        label: store.name,
        value: store.id,
    }))

    const currentStore = formattedItems.find((store) => store.value === params.storeId)

    const [open, setOpen] = React.useState(false)

    const handleSelect = (store: { value: string, label: string }) => {
        setOpen(false)
        router.push(`/${store.value}`)
    }
    
    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button 
                    variant       = 'outline'
                    size          = 'sm'
                    role          = 'combobox'
                    aria-expanded = {open}
                    aria-label    = 'Select a store'
                    className={cn('w-[200px] justify-between', className)}
                >
                    <div className='flex gap-2'>
                        <StoreIcon className='w-4 h-4' />
                        {currentStore?.label}
                    </div>
                    <ChevronsUpDownIcon className='w-4 h-4' />
                </Button>
            </PopoverTrigger>
            <PopoverContent className='w-[200px] p-0'>
                <Command>
                    <CommandInput placeholder='Search store...'/>
                    <CommandList>
                        <CommandEmpty>No store found.</CommandEmpty>
                        <CommandGroup heading='Stores'>
                            { formattedItems.map((store) => (
                                <CommandItem
                                    key={store.value}
                                    onSelect={() => handleSelect(store)}
                                    className='text-sm flex gap-2'
                                >
                                    <StoreIcon className='w-4 h-4' />
                                    {store.label}
                                    <CheckIcon className={cn(
                                        'w-4 h-4',
                                        store.value === currentStore?.value ? 'opacity-100' : 'opacity-0')}
                                    />
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                    <CommandSeparator />
                    <CommandList>
                        <CommandGroup>
                            <CommandItem onSelect={storeModal.onOpen} className='text-sm flex gap-2'>
                                <PlusCircleIcon className='w-4 h-4' />
                                Create new store
                            </CommandItem>
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    )
}
