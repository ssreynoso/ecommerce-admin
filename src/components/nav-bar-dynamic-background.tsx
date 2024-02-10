'use client'

import { cn } from '@/lib/utils'
import React, { PropsWithChildren } from 'react'
import { useBoolean, useEventListener } from 'usehooks-ts'

export const NavBarDynamicBackground = ({ children }: PropsWithChildren) => {
    const { value: moved, setFalse: setMovedFalse, setTrue: setMovedTrue } = useBoolean(false)

    const onScroll = () => {
        if (window.scrollY > 0) {
            setMovedTrue()
        } else {
            setMovedFalse()
        }
    }

    useEventListener('scroll', onScroll)

    return (
        <div
            className={cn(
                'px-4 w-full h-nav-bar-height border-b border-b-transparent xl:px-0',
                'transition-all fixed z-50 top-0 backdrop-blur-md',
                moved && 'border-b-border'
            )}
        >
            { children }
        </div>
    )
}
