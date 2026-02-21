'use client'

import { useEffect, useState } from 'react'
import { api } from '@/lib/api'
import { toast } from 'sonner'
import TaskComments from '@/components/tasks/TaskComments'
import TasksTableSkeleton from '@/components/tasks/TasksTableSkeleton'
interface Task {
  id: string
  title: string
  status: string
  priority: string
  assignedTo?: { email: string }
  assignedBy?: { email: string }
}
import TaskTimeline from '@/components/tasks/TaskTimeline'
export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState<any>(null)
const [statusFilter, setStatusFilter] = useState('ALL')
const [priorityFilter, setPriorityFilter] = useState('ALL')
const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null)
  const fetchTasks = async () => {
    try {
      const res = await api.get('/tasks')
      setTasks(res.data)
    } catch {
      // Error handled by interceptor
    } finally {
      setLoading(false)
    }
  }

  const fetchUser = async () => {
    try {
      const res = await api.get('/auth/me')
      setUser(res.data)
    } catch {}
  }

  useEffect(() => {
    fetchTasks()
    fetchUser()
  }, [])

  const updateStatus = async (taskId: string, status: string) => {
    try {
      await api.patch(`/tasks/${taskId}/status`, { status })
      toast.success('Task updated successfully')
      fetchTasks()
    } catch {
      // Error already handled globally
    }
  }

if (loading) return <TasksTableSkeleton />
const filteredTasks = tasks.filter((task) => {
  const statusMatch =
    statusFilter === 'ALL' || task.status === statusFilter

  const priorityMatch =
    priorityFilter === 'ALL' ||
    task.priority === priorityFilter

  return statusMatch && priorityMatch
})
  return (
    
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Tasks</h2>

      <div className="bg-white shadow rounded-lg overflow-hidden">

        <div className="flex gap-4 items-center">
  <select
    value={statusFilter}
    onChange={(e) => setStatusFilter(e.target.value)}
    className="border px-3 py-2 rounded"
  >
    <option value="ALL">All Status</option>
    <option value="PENDING">Pending</option>
    <option value="IN_PROGRESS">In Progress</option>
    <option value="SUBMITTED">Submitted</option>
    <option value="REVISION_REQUESTED">
      Revision Requested
    </option>
    <option value="COMPLETED">Completed</option>
  </select>

  <select
    value={priorityFilter}
    onChange={(e) => setPriorityFilter(e.target.value)}
    className="border px-3 py-2 rounded"
  >
    <option value="ALL">All Priority</option>
    <option value="LOW">Low</option>
    <option value="MEDIUM">Medium</option>
    <option value="HIGH">High</option>
  </select>

  <button
    onClick={() => {
      setStatusFilter('ALL')
      setPriorityFilter('ALL')
    }}
    className="px-4 py-2 bg-gray-200 rounded"
  >
    Reset
  </button>
</div>
        <table className="w-full text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3">Title</th>
              <th className="p-3">Status</th>
              <th className="p-3">Activity</th>
              <th className="p-3">Priority</th>
              <th className="p-3">Assigned To</th>
              <th className="p-3">Assigned By</th>
            </tr>
          </thead>
          <tbody>
          {filteredTasks.map((task) => (
              <tr key={task.id} className="border-t">
                <td className="p-3">{task.title}</td>

                <td className="p-3 space-y-2">
                  <div className="font-semibold">{task.status}</div>

                  {/* WRITER */}
                  {user?.roles?.includes('WRITER') &&
                    task.status === 'PENDING' && (
                      <button
                        onClick={() =>
                          updateStatus(task.id, 'IN_PROGRESS')
                        }
                        className="text-sm bg-blue-500 text-white px-2 py-1 rounded"
                      >
                        Start
                      </button>
                    )}

                  {user?.roles?.includes('WRITER') &&
                    task.status === 'IN_PROGRESS' && (
                      <button
                        onClick={() =>
                          updateStatus(task.id, 'SUBMITTED')
                        }
                        className="text-sm bg-yellow-500 text-white px-2 py-1 rounded"
                      >
                        Submit
                      </button>
                    )}

                  {/* EDITOR */}
                  {user?.roles?.includes('EDITOR') &&
                    task.status === 'SUBMITTED' && (
                      <>
                        <button
                          onClick={() =>
                            updateStatus(task.id, 'COMPLETED')
                          }
                          className="text-sm bg-green-600 text-white px-2 py-1 rounded mr-2"
                        >
                          Approve
                        </button>

                        <button
                          onClick={() =>
                            updateStatus(
                              task.id,
                              'REVISION_REQUESTED',
                            )
                          }
                          className="text-sm bg-red-500 text-white px-2 py-1 rounded"
                        >
                          Revision
                        </button>
                      </>
                    )}
                </td>
<button
  onClick={() => setSelectedTaskId(task.id)}
  className="text-xs text-blue-600 underline"
>
  View Activity
</button>
{selectedTaskId && (
  <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
    <div className="bg-white w-[600px] max-h-[80vh] overflow-y-auto p-6 rounded-lg">
      <div className="flex justify-between mb-4">
        <h3 className="text-lg font-bold">Task Activity</h3>
        <button
          onClick={() => setSelectedTaskId(null)}
          className="text-gray-500"
        >
          ✕
        </button>
      </div>

      <TaskTimeline taskId={selectedTaskId} />
      <hr className="my-4" />

<h4 className="font-semibold mb-2">Comments</h4>
<TaskComments taskId={selectedTaskId} />
    </div>
  </div>
)}
                <td className="p-3">{task.priority}</td>
                <td className="p-3">
                  {task.assignedTo?.email || '-'}
                </td>
                <td className="p-3">
                  {task.assignedBy?.email || '-'}
                </td>
                
              </tr>

            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}