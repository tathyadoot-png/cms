'use client'

import { useEffect, useState } from 'react'
import { api } from '@/lib/api'

export default function Dashboard() {
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    api.get('/auth/me')
      .then((res) => {
        setUser(res.data)
      })
      .catch(() => {
        window.location.href = '/login'
      })
  }, [])

  if (!user) return <p>Loading...</p>

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">
        Welcome {user.email}
      </h1>
      <p>Roles: {user.roles?.join(', ')}</p>
    </div>
  )
}
