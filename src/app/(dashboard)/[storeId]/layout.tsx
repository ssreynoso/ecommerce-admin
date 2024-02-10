import { NavBar } from '@/components/nav-bar'
import { getServerSessionData } from '@/lib/server-session'
import { redirect } from 'next/navigation'
import React, { PropsWithChildren } from 'react'
import prismadb from '@/lib/prismadb'

type Props = PropsWithChildren<{
    params: {
        storeId: string
    }
}>

const DashboardLayout = async ({ children, params }: Props) => {
    const { authenticated, data } = await getServerSessionData()
    if (!authenticated || !data.userId) {
        redirect('/sign-in')
    }
    const { userId } = data
    const store = await prismadb.store.findFirst({
        where: {
            id: params.storeId,
            userId
        }
    })

    if (!store) {
        redirect('/')
    }

    return (
        <>
            <NavBar />
            {children}
        </>
    )
}

export default DashboardLayout
