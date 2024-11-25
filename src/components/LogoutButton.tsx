// src/components/LogoutButton.tsx
'use client'

import { signOut } from 'next-auth/react'

export default function LogoutButton() {
  return (
    <button
      onClick={() => signOut({ callbackUrl: '/login' })}
      className="px-4 py-2 text-sm text-red-200 hover:text-red-100 hover:bg-red-900/20 rounded-md transition-colors"
    >
      Se déconnecter
    </button>
  )
}