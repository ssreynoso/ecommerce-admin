'use client'

import { signIn, signOut, useSession } from 'next-auth/react'
import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button, buttonVariants } from '@/components/ui/button'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { LogOut } from 'lucide-react'
import { Spinner } from '../spinner'
import { cn } from '@/lib/utils'

export const AuthButton = () => {
    const session   = useSession()
    const user      = session.data?.user
    const userImage = user?.image || ''
    const userName  = user?.name || ''

    return (
        <>
            {session.status === 'authenticated' ? (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                            <Avatar className="h-8 w-8">
                                <AvatarImage src={userImage} alt={userName} />
                                <AvatarFallback>
                                    {userName.split(' ').map((name) => name[0])}
                                </AvatarFallback>
                            </Avatar>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56">
                        <DropdownMenuLabel className="font-normal">
                            {session.data.user?.name || ''}
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => signOut()}>
                            <LogOut className="mr-2 h-4 w-4" />
                            <span>Cerrar sesión</span>
                            {/* <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut> */}
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            ) : (
                session.status === 'loading' ? (
                    <div className={cn(
                        buttonVariants({ size: 'icon', variant: 'ghost' }),
                    )}>
                        <Spinner className='w-6 h-6' />
                    </div>
                ) : (
                    <Button onClick={() => signIn()}>Sign In</Button>
                )
            )}
        </>
    )
}
