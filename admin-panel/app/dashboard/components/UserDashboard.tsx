'use client'

import { useEffect, useState } from 'react'
import { api } from '@/lib/api'
import KpiCard from './KpiCard'
import { toast } from 'sonner'

export default function UserDashboard() {
  const [data, setData] = useState<any>(null)

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await api.get('/tasks/my-dashboard')
        setData(res.data)
      } catch (err: any) {
        toast.error('Failed to load dashboard')
      }
    }

    fetch()
  }, [])

  if (!data) return null

  return (
    <div className="grid grid-cols-4 gap-6">
      <KpiCard title="Total Tasks" value={data.totalTasks} color="from-indigo-500 to-indigo-700" />
      <KpiCard title="Completed" value={data.completed} color="from-green-500 to-green-700" />
      <KpiCard title="In Progress" value={data.inProgress} color="from-blue-500 to-blue-700" />
      <KpiCard title="Overdue" value={data.overdue} color="from-red-500 to-red-700" />
    </div>
  )
}