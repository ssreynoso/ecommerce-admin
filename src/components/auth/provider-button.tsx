'use client'

import { Button } from '@/components/ui/button'
import { ClientSafeProvider, signIn } from 'next-auth/react'
import Image from 'next/image'
import React from 'react'

type Props = {
    provider:    ClientSafeProvider
    buttonText?: (provider: ClientSafeProvider) => string
}

export const ProviderButton = ({ provider, buttonText }: Props) => {
    const handleAction = () => {
        signIn(provider.id, {
            callbackUrl: '/',
        }, {
            
        })
    }

    if (provider.id === 'google') {
        return (
            <Button onClick={handleAction} className='flex gap-4 w-full'>
                <Image src='https://authjs.dev/img/providers/google.svg' width={20} height={20} alt='Google' />
                { buttonText ? buttonText(provider) : `Sign in with ${provider.name}`}
            </Button>
        )
    }

    return (
        <Button onClick={handleAction}>
            Sign in with {provider.name}
        </Button>
    )
}
