'use client'

import { useEffect, useState } from 'react'
import { api } from '@/lib/api'
import AdminDashboard from './components/AdminDashboard'
import UserDashboard from './components/UserDashboard'
import DashboardSkeleton from './components/DashboardSkeleton'
import { toast } from 'sonner'

export default function DashboardPage() {
  const [role, setRole] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const init = async () => {
      try {
        const res = await api.get('/auth/me')
        const roles = res.data.roles

        if (
          roles.includes('SUPER_ADMIN') ||
          roles.includes('ADMIN')
        ) {
          setRole('ADMIN')
        } else {
          setRole('USER')
        }
      } catch (err: any) {
        toast.error('Failed to load user')
      } finally {
        setLoading(false)
      }
    }

    init()
  }, [])

  if (loading) return <DashboardSkeleton />

  if (role === 'ADMIN') return <AdminDashboard />

  return <UserDashboard />
}