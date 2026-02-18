'use client'

import { useEffect, useState } from 'react'
import { api } from '@/lib/api'

export default function UsersPage() {
  const [users, setUsers] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
const [roles, setRoles] = useState<any[]>([])

  const [showForm, setShowForm] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('USER')
  const [organizationId, setOrganizationId] = useState('')

  const fetchUsers = async () => {
    try {
      const res = await api.get('/users')
      setUsers(res.data)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }
const fetchRoles = async () => {
  try {
    const res = await api.get('/roles')
    setRoles(res.data)
  } catch (err) {
    console.error(err)
  }
}

useEffect(() => {
  fetchUsers()
  fetchRoles()
}, [])


  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      await api.post('/users', {
        email,
        password,
        role,
        organizationId,
      })

      setShowForm(false)
      setEmail('')
      setPassword('')
      setRole('USER')

      fetchUsers()
    } catch (err: any) {
      alert(err.response?.data?.message || 'Error creating user')
    }
  }

  if (loading) return <p>Loading...</p>

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Users</h2>
        <button
          onClick={() => setShowForm(true)}
          className="bg-black text-white px-4 py-2 rounded"
        >
          + Add User
        </button>
      </div>

      {/* Users Table */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3">Email</th>
              <th className="p-3">Roles</th>
              <th className="p-3">Active</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-t">
                <td className="p-3">{user.email}</td>
                <td className="p-3">
                  {user.roles?.map((r: any) => r.role.name).join(', ')}
                </td>
                <td className="p-3">
                  {user.isActive ? 'Yes' : 'No'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Create User Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <form
            onSubmit={handleCreateUser}
            className="bg-white p-6 rounded-lg w-[400px] space-y-4"
          >
            <h3 className="text-xl font-bold">Create User</h3>

            <input
              type="email"
              placeholder="Email"
              className="w-full border p-2 rounded"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <input
              type="password"
              placeholder="Password"
              className="w-full border p-2 rounded"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <input
              type="text"
              placeholder="Organization ID"
              className="w-full border p-2 rounded"
              value={organizationId}
              onChange={(e) => setOrganizationId(e.target.value)}
              required
            />

          <select
  className="w-full border p-2 rounded"
  value={role}
  onChange={(e) => setRole(e.target.value)}
>
  {roles.map((r: any) => (
    <option key={r.id} value={r.name}>
      {r.name}
    </option>
  ))}
</select>

            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="px-4 py-2 border rounded"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="px-4 py-2 bg-black text-white rounded"
              >
                Create
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  )
}
