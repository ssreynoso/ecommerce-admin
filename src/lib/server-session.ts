import { auth } from './auth'

type Response =
      { authenticated: false, data: null }
    | { authenticated: true , data: { id: string } }

export async function getServerSessionData(): Promise<Response> {
    const session = await auth()
    if (!session || !session.user) {
        return { authenticated: false, data: null }
    }
    const { id } = session.user as { id: string }
    return {
        authenticated: true,
        data: { id },
    }
}
