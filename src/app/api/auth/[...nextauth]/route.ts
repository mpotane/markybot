import NextAuth from 'next-auth'
import GithubProvider from 'next-auth/providers/github'
import { env } from '@/env/server'
import { PrismaAdapter } from '@auth/prisma-adapter'
import { PrismaClient } from '@prisma/client'
import type { Adapter } from 'next-auth/adapters'

const prisma = new PrismaClient()

const handler = NextAuth({
    adapter: PrismaAdapter(prisma) as Adapter,
    providers: [
        GithubProvider({
            clientId: env.GITHUB_CLIENT_ID,
            clientSecret: env.GITHUB_CLIENT_SECRET,
        }),
    ],
})

export { handler as GET, handler as POST }