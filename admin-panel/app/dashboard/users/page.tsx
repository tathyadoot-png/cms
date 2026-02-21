'use client'

import { useEffect, useState } from 'react'
import { api } from '@/lib/api'

export default function UsersPage() {
  const [users, setUsers] = useState<any[]>([])
  const [roles, setRoles] = useState<any[]>([])
  const [showForm, setShowForm] = useState(false)
  const [editingUser, setEditingUser] = useState<any>(null)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [shortCode, setShortCode] = useState('')
  const [selectedRoles, setSelectedRoles] = useState<string[]>([])

  const fetchUsers = async () => {
    const res = await api.get('/users')
    setUsers(res.data)
  }

  const fetchRoles = async () => {
    const res = await api.get('/roles')
    setRoles(res.data)
  }

  useEffect(() => {
    fetchUsers()
    fetchRoles()
  }, [])

  const handleRoleChange = (roleName: string) => {
    if (selectedRoles.includes(roleName)) {
      setSelectedRoles(selectedRoles.filter(r => r !== roleName))
    } else {
      setSelectedRoles([...selectedRoles, roleName])
    }
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault()

    if (editingUser) {
      await api.put(`/users/${editingUser.id}`, {
        roles: selectedRoles,
        shortCode,
      })
    } else {
      await api.post('/users', {
        email,
        password,
        roles: selectedRoles,
        shortCode,
      })
    }

    setShowForm(false)
    setEditingUser(null)
    setEmail('')
    setPassword('')
    setSelectedRoles([])
    setShortCode('')
    fetchUsers()
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between">
        <h2 className="text-2xl font-bold">Users</h2>
        <button
          onClick={() => setShowForm(true)}
          className="bg-black text-white px-4 py-2 rounded"
        >
          + Add User
        </button>
      </div>

      <table className="w-full bg-white shadow rounded">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-3">Email</th>
            <th className="p-3">Organization</th>
            <th className="p-3">Roles</th>
            <th className="p-3">Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id} className="border-t">
              <td className="p-3">{user.email}</td>
              <td className="p-3">{user.organization?.shortCode}</td>
              <td className="p-3">
                {user.roles.map((r: any) => r.role.name).join(', ')}
              </td>
              <td className="p-3">
                <button
                  className="text-blue-600"
                  onClick={() => {
                    setEditingUser(user)
                    setShortCode(user.organization.shortCode)
                    setSelectedRoles(user.roles.map((r: any) => r.role.name))
                    setShowForm(true)
                  }}
                >
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showForm && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
          <form onSubmit={handleSubmit} className="bg-white p-6 rounded w-[400px] space-y-4">
            <h3 className="text-xl font-bold">
              {editingUser ? 'Edit User' : 'Create User'}
            </h3>

            {!editingUser && (
              <>
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full border p-2 rounded"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                />
                <input
                  type="password"
                  placeholder="Password"
                  className="w-full border p-2 rounded"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                />
              </>
            )}

            <input
              type="number"
              placeholder="Organization Short Code"
              className="w-full border p-2 rounded"
              value={shortCode}
              onChange={e => setShortCode(e.target.value)}
              required
            />

            <div>
              <p className="font-semibold mb-2">Select Roles:</p>
              {roles.map((r: any) => (
                <label key={r.id} className="block">
                  <input
                    type="checkbox"
                    checked={selectedRoles.includes(r.name)}
                    onChange={() => handleRoleChange(r.name)}
                  />{' '}
                  {r.name}
                </label>
              ))}
            </div>

            <div className="flex justify-end gap-3">
              <button type="button" onClick={() => setShowForm(false)}>
                Cancel
              </button>
              <button className="bg-black text-white px-4 py-2 rounded">
                Save
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  )
}