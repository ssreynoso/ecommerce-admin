import prismadb from '@/lib/prismadb'
import { getServerSessionData } from '@/lib/server-session'
import { redirect } from 'next/navigation'
import React from 'react'
import { SettingsForm } from './components/settings-form'

interface SettingsPageProps {
    params: { storeId: string }
}

const SettingsPage = async ({ params }: SettingsPageProps) => {    
    const { authenticated, data } = await getServerSessionData()
    if (!authenticated || !data.userId) {
        redirect('/sign-in')
    }
    const { userId } = data
    const { storeId } = params
    const store = await prismadb.store.findFirst({
        where: {
            userId,
            id: storeId,
        },
    })

    if (!store) {
        redirect('/')
    }

    return (
        <div className='mt-nav-bar-height container'>
            <div className='space-y-4'>
                <SettingsForm initialData={store}/>
            </div>
        </div>
    )
}

export default SettingsPage