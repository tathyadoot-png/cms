'use client'

import { useEffect, useState } from 'react'
import { api } from '@/lib/api'

export default function AssignTaskPage() {
  const [writers, setWriters] = useState<any[]>([])
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [priority, setPriority] = useState('MEDIUM')
  const [assignedToId, setAssignedToId] = useState('')

  const fetchWriters = async () => {
    try {
      const res = await api.get('/users/writers')
      setWriters(res.data)
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    fetchWriters()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      await api.post('/tasks', {
        title,
        description,
        priority,
        assignedToId,
      })

      alert('Task assigned successfully')
      setTitle('')
      setDescription('')
    } catch (err: any) {
      alert(err.response?.data?.message || 'Error assigning task')
    }
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Assign Task</h2>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow space-y-4 max-w-md"
      >
        <input
          type="text"
          placeholder="Title"
          className="w-full border p-2 rounded"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <textarea
          placeholder="Description"
          className="w-full border p-2 rounded"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <select
          className="w-full border p-2 rounded"
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
        >
          <option value="LOW">LOW</option>
          <option value="MEDIUM">MEDIUM</option>
          <option value="HIGH">HIGH</option>
        </select>

        <select
          className="w-full border p-2 rounded"
          value={assignedToId}
          onChange={(e) => setAssignedToId(e.target.value)}
          required
        >
          <option value="">Select Writer</option>
          {writers.map((writer) => (
            <option key={writer.id} value={writer.id}>
              {writer.email}
            </option>
          ))}
        </select>

        <button
          type="submit"
          className="w-full bg-black text-white py-2 rounded"
        >
          Assign Task
        </button>
      </form>
    </div>
  )
}