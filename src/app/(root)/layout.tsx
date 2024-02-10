import prismadb from '@/lib/prismadb'
import { getServerSessionData } from '@/lib/server-session'
import { redirect } from 'next/navigation'
import { PropsWithChildren } from 'react'

const SetupLayout = async ({ children }: PropsWithChildren) => {
    const { authenticated, data } = await getServerSessionData()
    if (!authenticated || !data.userId) {
        redirect('/sign-in')
    }
    const { userId } = data
    const store = await prismadb.store.findFirst({
        where: { userId },
    })

    if (store) {
        redirect(`/${store.id}`)
    }

    return (
        <>
            {children}
        </>
    )
}

export default SetupLayout
