import NextAuth from 'next-auth'
import GithubProvider from 'next-auth/providers/github'
import { env } from '@/env/server'

const handler = NextAuth({
    providers: [
        GithubProvider({
            clientId: env.GITHUB_CLIENT_ID,
            clientSecret: env.GITHUB_CLIENT_SECRET,
        }),
    ],
})

export { handler as GET, handler as POST }