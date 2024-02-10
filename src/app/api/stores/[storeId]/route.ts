import prismadb from '@/lib/prismadb'
import { getServerSessionData } from '@/lib/server-session'
import { NextRequest, NextResponse } from 'next/server'

export async function PATCH(
    request: NextRequest,
    { params }: { params: { storeId: string } })
{
    try {
        const { storeId } = params

        const { authenticated, data } = await getServerSessionData()
        if (!authenticated || !data.userId) {
            return new NextResponse('Unauthorized', { status: 401 })
        }
        const { userId } = data

        const body = await request.json()
        const { name } = body
        if (!name) {
            return new NextResponse('Name is required', { status: 400 })
        }

        if (!storeId) {
            return new NextResponse('Store id is required', { status: 400 })
        }

        const store = await prismadb.store.updateMany({
            where: { 
                id: storeId,
                userId
            },
            data: { name }
        })

        return NextResponse.json(store)
    } catch (error) {
        console.log('[STORE_PATCH]', error)
        return new NextResponse('Internal error', { status: 500})
    }
}

export async function DELETE(
    _request: NextRequest,
    { params }: { params: { storeId: string } })
{
    try {
        const { storeId } = params

        const { authenticated, data } = await getServerSessionData()
        if (!authenticated || !data.userId) {
            return new NextResponse('Unauthorized', { status: 401 })
        }
        const { userId } = data

        if (!storeId) {
            return new NextResponse('Store id is required', { status: 400 })
        }

        const store = await prismadb.store.deleteMany({
            where: { 
                id: storeId,
                userId
            }
        })

        return NextResponse.json(store)
    } catch (error) {
        console.log('[STORE_DELETE]', error)
        return new NextResponse('Internal error', { status: 500})
    }
}