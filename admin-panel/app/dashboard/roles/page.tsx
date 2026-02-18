'use client'

import { useEffect, useState } from 'react'
import { api } from '@/lib/api'

export default function RolesPage() {
  const [roles, setRoles] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  const [showForm, setShowForm] = useState(false)
  const [editingRole, setEditingRole] = useState<any>(null)

  const [name, setName] = useState('')
  const [shortCode, setShortCode] = useState('')

  const fetchRoles = async () => {
    try {
      const res = await api.get('/roles')
      setRoles(res.data)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchRoles()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      if (editingRole) {
        await api.put(`/roles/${editingRole.id}`, { name })
      } else {
        await api.post('/roles', {
          name,
          shortCode,
        })

      }

      setShowForm(false)
      setEditingRole(null)
      setName('')
      setShortCode('')
      fetchRoles()
    } catch (err: any) {
      alert(err.response?.data?.message || 'Error')
    }
  }

  if (loading) return <p>Loading...</p>

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Roles</h2>
        <button
          onClick={() => setShowForm(true)}
          className="bg-black text-white px-4 py-2 rounded"
        >
          + Add Role
        </button>
      </div>

      {/* Roles Table */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3">Role Name</th>
              <th className="p-3">Organization</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {roles.map((role) => (
              <tr key={role.id} className="border-t">
                <td className="p-3">{role.name}</td>
                <td className="p-3">{role.organization?.name}</td>
                <td className="p-3 space-x-3">
                  <button
                    onClick={() => {
                      setEditingRole(role)
                      setName(role.name)
                      setShowForm(true)
                    }}
                    className="text-blue-600"
                  >
                    Edit
                  </button>

                  <button
                    onClick={async () => {
                      if (confirm('Are you sure you want to delete this role?')) {
                        await api.delete(`/roles/${role.id}`)
                        fetchRoles()  
                      }
                    }}
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

      {/* Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <form
            onSubmit={handleSubmit}
            className="bg-white p-6 rounded-lg w-[400px] space-y-4"
          >
            <h3 className="text-xl font-bold">
              {editingRole ? 'Edit Role' : 'Create Role'}
            </h3>

            <input
              type="text"
              placeholder="Role Name"
              className="w-full border p-2 rounded"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />

            {!editingRole && (
              <input
                type="number"
                placeholder="Organization Short Code"
                className="w-full border p-2 rounded"
                value={shortCode}
                onChange={(e) => setShortCode(e.target.value)}
                required
              />

            )}

            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={() => {
                  setShowForm(false)
                  setEditingRole(null)
                }}
                className="px-4 py-2 border rounded"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="px-4 py-2 bg-black text-white rounded"
              >
                {editingRole ? 'Update' : 'Create'}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  )
}
