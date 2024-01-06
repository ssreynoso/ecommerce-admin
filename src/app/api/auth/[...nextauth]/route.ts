import { config } from '@/lib/auth'
import type { NextApiRequest, NextApiResponse } from 'next'
import NextAuth from 'next-auth'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    // Do whatever you want here, before the request is passed down to `NextAuth`
    // if (req.query?.nextauth?.includes('callback') && req.method === 'POST') {
    //     console.log('Handling callback request from my Identity Provider', req.body)
    // }

    return await NextAuth(req, res, config)
}

export { handler as GET, handler as POST }
