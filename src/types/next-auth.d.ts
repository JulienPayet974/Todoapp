// src/types/next-auth.d.ts
import 'next-auth'

declare module 'next-auth' {
  interface Session {
    user: {
      id: string
      email: string
      name?: string
    } & DefaultSession['user']
  }

  interface User {
    id: string
    email: string
    name?: string
  }
}