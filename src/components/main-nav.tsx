'use client'

import React from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { DropdownNav } from '@/components/dropdown-nav'
import {  buttonVariants } from '@/components/ui/button'
import { useParams, usePathname } from 'next/navigation'

type Props = { className?: string } & React.HTMLAttributes<HTMLElement>

export const MainNav = (props: Props) => {
    const { className } = props
    const pathname = usePathname()
    const params = useParams()

    const navOptions = [
        { value: `/${params.storeId}`, label: 'Overview', active: pathname === `/${params.storeId}` },
        { value: `/${params.storeId}/settings`, label: 'Settings', active: pathname === `/${params.storeId}/settings` },
    ]

    return (
        <>
            <nav className={cn('hidden xl:flex items-center', className)}>
                { navOptions.map(op => (
                    <Link key={op.value} href={op.value} className={cn(
                        buttonVariants({ variant: 'link' }),
                        op.active && 'text-muted-foreground underline'
                    )}
                    >{op.label}</Link>
                ))}
            </nav>
            <DropdownNav options={navOptions} className="xl:hidden" />
        </>
    )
}
