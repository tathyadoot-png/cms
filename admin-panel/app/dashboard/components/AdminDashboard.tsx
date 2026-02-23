'use client'

import { useEffect, useState } from 'react'
import { api } from '@/lib/api'
import KpiCard from './KpiCard'
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts'
import { toast } from 'sonner'

export default function AdminDashboard() {
  const [data, setData] = useState<any>(null)

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await api.get('/tasks/admin-dashboard')
        setData(res.data)
      } catch (err: any) {
        toast.error('Failed to load admin analytics')
      }
    }

    fetch()
  }, [])

  if (!data) return null

  return (
    <div className="space-y-10">

      {/* GLOBAL STATS */}
      <div className="grid grid-cols-4 gap-6">
        <KpiCard title="Total Tasks" value={data.totalTasks} color="from-indigo-600 to-purple-600" />
        <KpiCard title="Completion %" value={`${data.completionRate}%`} color="from-green-500 to-green-700" />
        <KpiCard title="Revision %" value={`${data.revisionRate}%`} color="from-red-500 to-red-700" />
        <KpiCard title="Overdue" value={data.overdue} color="from-yellow-500 to-yellow-700" />
        <KpiCard title="Submitted" value={data.submitted} color="from-yellow-500 to-yellow-700" />
      </div>

      {/* WRITER PERFORMANCE TABLE */}
      <div className="bg-white rounded-xl shadow p-6">
        <h3 className="text-xl font-bold mb-4">
          Writer Performance
        </h3>

        <table className="w-full text-left">
          <thead>
            <tr className="border-b">
              <th>Email</th>
              <th>Total</th>
              <th>Completed</th>
              <th>Revisions</th>
              <th>Overdue</th>
              <th>Completion %</th>
            </tr>
          </thead>
          <tbody>
            {data.writersPerformance.map((w: any) => (
              <tr key={w.email} className="border-b">
                <td>{w.email}</td>
                <td>{w.total}</td>
                <td>{w.completed}</td>
                <td>{w.revisions}</td>
                <td>{w.overdue}</td>
                <td>{w.completionRate}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* CHART */}
      <div className="bg-white rounded-xl shadow p-6">
        <h3 className="text-xl font-bold mb-4">
          Completion Comparison
        </h3>

        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data.writersPerformance}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="email" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="completionRate" fill="#4f46e5" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}