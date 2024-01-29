import prismadb from '@/lib/prismadb'
import { getServerSessionData } from '@/lib/server-session'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
    try {
        const { authenticated, data } = await getServerSessionData()
        if (!authenticated || !data.id) {
            return new NextResponse('Unauthorized', { status: 401 })
        }
        const { id } = data

        const body = await request.json()
        const { name } = body
        if (!name) {
            return new NextResponse('Missing name', { status: 400 })
        }

        console.log('[STORES_POST] body: ', body)
        console.log('[STORES_POST] id: ', id)
        return new NextResponse('ADS', { status: 400 })

        const store = await prismadb.store.create({
            data: {
                name,
                userId: id,
            }
        })

        return NextResponse.json(store)
    } catch (error) {
        console.log('[STORES_POST]', error)
        return new NextResponse('Internal error', { status: 500})
    }
}