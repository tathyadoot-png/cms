'use client'

import { useEffect, useState } from 'react'
import { api } from '@/lib/api'
import { toast } from 'sonner'

interface Comment {
  id: string
  content: string
  createdAt: string
  user: { email: string }
}

export default function TaskComments({
  taskId,
}: {
  taskId: string
}) {
  const [comments, setComments] = useState<Comment[]>([])
  const [newComment, setNewComment] = useState('')

  const fetchComments = async () => {
    try {
      const res = await api.get(`/comments/${taskId}`)
      setComments(res.data)
    } catch {}
  }

  useEffect(() => {
    fetchComments()
  }, [taskId])

  const handleAdd = async () => {
    if (!newComment.trim()) return

    try {
      await api.post(`/comments/${taskId}`, {
        content: newComment,
      })

      toast.success('Comment added')
      setNewComment('')
      fetchComments()
    } catch {}
  }

  return (
    <div className="space-y-4">
      <div className="space-y-2 max-h-[300px] overflow-y-auto">
        {comments.map((c) => (
          <div
            key={c.id}
            className="bg-gray-100 p-3 rounded"
          >
            <p className="text-sm">{c.content}</p>
            <p className="text-xs text-gray-500 mt-1">
              {c.user.email} •{' '}
              {new Date(c.createdAt).toLocaleString()}
            </p>
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        <input
          value={newComment}
          onChange={(e) =>
            setNewComment(e.target.value)
          }
          placeholder="Write a comment..."
          className="flex-1 border px-3 py-2 rounded"
        />
        <button
          onClick={handleAdd}
          className="bg-black text-white px-4 py-2 rounded"
        >
          Send
        </button>
      </div>
    </div>
  )
}