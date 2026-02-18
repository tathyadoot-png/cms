'use client'

import { useEffect, useState } from 'react'
import { api } from '@/lib/api'

export default function OrganizationsPage() {
  const [orgs, setOrgs] = useState<any[]>([])
  const [name, setName] = useState('')
  const [editing, setEditing] = useState<any>(null)

  const fetchOrgs = async () => {
    const res = await api.get('/organizations')
    setOrgs(res.data)
  }

  useEffect(() => {
    fetchOrgs()
  }, [])

  const handleSubmit = async (e: any) => {
    e.preventDefault()

    if (editing) {
      await api.put(`/organizations/${editing.id}`, { name })
    } else {
      await api.post('/organizations', { name })
    }

    setName('')
    setEditing(null)
    fetchOrgs()
  }

  const handleDelete = async (id: string) => {
    await api.delete(`/organizations/${id}`)
    fetchOrgs()
  }

  return (
    <div className="space-y-6">

      <h2 className="text-2xl font-bold">Organizations</h2>

      <form onSubmit={handleSubmit} className="flex gap-3">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Organization Name"
          className="border p-2 rounded"
        />
        <button className="bg-black text-white px-4 py-2 rounded">
          {editing ? 'Update' : 'Create'}
        </button>
      </form>

      <div className="bg-white shadow rounded">
        <table className="w-full text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3">ID</th>
              <th className="p-3">Name</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orgs.map((org) => (
              <tr key={org.id} className="border-t">
<td>{org.shortCode}</td>
                <td className="p-3">{org.name}</td>
                <td className="p-3 space-x-2">
                  <button
                    onClick={() => {
                      setEditing(org)
                      setName(org.name)
                    }}
                    className="text-blue-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(org.id)}
                    className="text-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
