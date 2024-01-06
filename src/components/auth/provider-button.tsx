'use client'

import { Button } from '@/components/ui/button'
import { ClientSafeProvider, signIn } from 'next-auth/react'
import Image from 'next/image'
import React from 'react'

type Props = {
    provider: ClientSafeProvider
}

export const ProviderButton = ({ provider }: Props) => {
    if (provider.id === 'google') {
        return (
            <Button onClick={() => signIn(provider.id)} className='flex gap-4 w-full'>
                <Image src='https://authjs.dev/img/providers/google.svg' width={20} height={20} alt='Google' />
                Sign in with {provider.name}
            </Button>
        )
    }

    return (
        <Button onClick={() => signIn(provider.id)}>
            Sign in with {provider.name}
        </Button>
    )
}
