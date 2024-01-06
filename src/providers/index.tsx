'use client'

import { PropsWithChildren } from 'react'
import { ThemeProvider } from '@/providers/theme-provider'
import { AppContextProvider } from '@/providers/app-context-provider'
import { SessionProvider } from 'next-auth/react'
import { Toaster } from '@/components/ui/toaster'

export const Providers = ({ children }: PropsWithChildren) => {
    return (
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <AppContextProvider>
                <SessionProvider>
                    {children}
                    <Toaster />
                </SessionProvider>
            </AppContextProvider>
        </ThemeProvider>
    )
}
