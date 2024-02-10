import prismadb from '@/lib/prismadb'
import React from 'react'

type Props = {
    params: {
        storeId: string
    }
}

const DashboardPage = async ({ params }: Props) => {
    const { storeId } = params
    const store = await prismadb.store.findFirst({
        where: {
            id: storeId
        }
    })

    return (
        <div className='mt-nav-bar-height container'>
            <h1>Active store {store?.name}</h1>
            <pre>
                {JSON.stringify(store, null, 2)}
            </pre>
        </div>
    )
}

export default DashboardPage
