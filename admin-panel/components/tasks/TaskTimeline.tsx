'use client'

import { useEffect, useState } from 'react'
import { api } from '@/lib/api'
import { toast } from 'sonner'

interface Log {
  id: string
  action: string
  description: string
  createdAt: string
  performedBy: {
    email: string
  }
}

export default function TaskTimeline({
  taskId,
}: {
  taskId: string
}) {
  const [logs, setLogs] = useState<Log[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const res = await api.get(`/audit/task/${taskId}`)
        setLogs(res.data)
      } catch {
        // handled by interceptor
      } finally {
        setLoading(false)
      }
    }

    fetchLogs()
  }, [taskId])

  if (loading) return <p>Loading timeline...</p>

  return (
    <div className="space-y-4">
      {logs.length === 0 && (
        <p className="text-gray-500">No activity yet.</p>
      )}

      {logs.map((log) => (
        <div key={log.id} className="flex gap-4">
          <div className="w-3 h-3 bg-blue-500 rounded-full mt-2" />

          <div className="bg-gray-50 p-3 rounded shadow w-full">
            <p className="text-sm font-semibold">
              {log.description}
            </p>
            <p className="text-xs text-gray-500">
              By {log.performedBy?.email} •{' '}
              {new Date(log.createdAt).toLocaleString()}
            </p>
          </div>
        </div>
      ))}
    </div>
  )
}