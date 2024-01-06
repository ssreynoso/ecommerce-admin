import { cn } from '@/lib/utils'
import React from 'react'

type Props = {
    className?: string
    variant?: 'primary' | 'secondary'
}

export const Spinner = ({ className }: Props) => {
    return (
        <div
            className={cn(
                'h-8 w-8 inline-block rounded-full border-4 border-r-background border-solid animate-spin',
                className,
            )}
        ></div>
    )
}
