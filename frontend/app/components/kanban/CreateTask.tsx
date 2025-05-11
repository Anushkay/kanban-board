'use client'
import { useState } from 'react'

export function CreateTask({ columnId, onCreate }: any) {
  const [title, setTitle] = useState('')
  const [isCreating, setIsCreating] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim()) return
    await onCreate(columnId, title)
    setTitle('')
    setIsCreating(false)
  }

  if (!isCreating) {
    return (
      <button
        onClick={() => setIsCreating(true)}
        className="w-full mt-2 px-2 py-1 text-sm text-gray-600 hover:text-white"
      >
        + Add Task
      </button>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="mt-2">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Task title"
        className="w-full px-2 py-1 text-sm border rounded"
        autoFocus
      />
      
      <div className="flex gap-1 mt-1">
        <button
          type="submit"
          className="px-2 py-1 text-xs bg-green-600 text-white rounded hover:bg-green-700"
        >
          Add Task
        </button>
        <button
          type="button"
          onClick={() => setIsCreating(false)}
          className="px-2 py-1 text-xs bg-gray-500 text-white rounded hover:bg-gray-600"
        >
          Cancel
        </button>
      </div>
    </form>
  )
}