import prismadb from '@/lib/prismadb'
import { getServerSessionData } from '@/lib/server-session'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
    try {
        const { authenticated, data } = await getServerSessionData()
        if (!authenticated || !data.userId) {
            return new NextResponse('Unauthorized', { status: 401 })
        }
        const { userId } = data

        const body = await request.json()
        const { name } = body
        if (!name) {
            return new NextResponse('Missing name', { status: 400 })
        }

        const store = await prismadb.store.create({
            data: {
                name,
                userId,
            }
        })

        return NextResponse.json(store)
    } catch (error) {
        console.log('[STORES_POST]', error)
        return new NextResponse('Internal error', { status: 500})
    }
}