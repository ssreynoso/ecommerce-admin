/* eslint-disable @typescript-eslint/no-unused-vars */
import type { GetServerSidePropsContext, NextApiRequest, NextApiResponse } from 'next'
import type { NextAuthOptions } from 'next-auth'
import { getServerSession } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import CredentialsProvider from 'next-auth/providers/credentials'

// You'll need to import and pass this
// to `NextAuth` in `app/api/auth/[...nextauth]/route.ts`
export const config = {
    providers: [
        CredentialsProvider({
            id: 'login',
            name: 'credentials',
            credentials: {
                username: { label: 'Username', type: 'text', placeholder: 'Ingrese usuario' },
                password: { label: 'Password', type: 'password' },
            },
            async authorize(credentials) {
                // Esto es lo que se ejecuta cuando se hace login
                // Se evalúan las credenciales de la manera que se quiera
                // Si esta todo ok se retorna un nuevo usuario. Si no, se lanza un error

                const user = {
                    ...credentials,
                    name: 'Pepito',
                    surname: 'Subrian',
                }

                delete user.password

                // if (error) {
                //     throw new Error('Error al iniciar sesión, el usuario o contraseña son incorrectos')
                // }

                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                return user as any
            },
        }),
        CredentialsProvider({
            id: 'registration',
            name: 'credentials',
            credentials: {
                username: { label: 'Username', type: 'text', placeholder: 'Ingrese usuario' },
                password: { label: 'Password', type: 'password' },
            },
            async authorize(credentials) {
                // Esto es lo que se ejecuta cuando se hace login
                // Se evalúan las credenciales de la manera que se quiera
                // Si esta todo ok se retorna un nuevo usuario. Si no, se lanza un error

                const user = {
                    ...credentials,
                    name: 'Alberto',
                    surname: 'Fernandez',
                }

                delete user.password

                // if (error) {
                //     throw new Error('Error al iniciar sesión, el usuario o contraseña son incorrectos')
                // }

                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                return user as any
            },
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID || '',
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
        }),
    ],
    pages: {
        signIn: '/sign-in',
    },
    session: {
        strategy: 'jwt',
    },
    callbacks: {
        async signIn({ user, account, profile, email, credentials }) {
            // Utilizamos la callback signIn para validar si el usuario puede iniciar sesión.
            // Retorna true o false dependiendo si el usuario puede iniciar sesión o no.
            return true
        },
        // async redirect({ url, baseUrl }) {
        //     // console.log('url: ', url)
        //     return baseUrl
        // },
        async jwt({ token, user }) {
            // Utilizamos la callback jwt para guardar en el token los datos que provengan
            // de la callback authorize en caso de que usemos credenciales.
            if (user) {
                token.user = user
            }
            return token
        },
        async session({ session, token }) {
            // Utilizamos la callback session para enviar al cliente 
            // los datos que encripta y guarda en el token la callback jwt
            session.user = token.user as typeof session.user
            return session
        },
    },
} satisfies NextAuthOptions

// Use it in server contexts
export function auth(
    ...args:
        | [GetServerSidePropsContext['req'], GetServerSidePropsContext['res']]
        | [NextApiRequest, NextApiResponse]
        | []
) {
    return getServerSession(...args, config)
}
