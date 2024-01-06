import '@/styles/globals.css'
import '@/styles/variables.css'
import '@/styles/animations.css'
import '@/styles/scroll-bar.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Providers } from '@/providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: 'Title',
    description: 'Description',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <Providers>
                    {children}
                </Providers>
            </body>
        </html>
    )
}
