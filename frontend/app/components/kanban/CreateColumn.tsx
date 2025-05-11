'use client'
import { useState } from 'react'

export function CreateColumn({ onCreate }: { onCreate: (title: string) => void }) {
  const [title, setTitle] = useState('')
  const [isCreating, setIsCreating] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim()) return
    await onCreate(title)
    setTitle('')
    setIsCreating(false)
  }

  if (!isCreating) {
    return (
      <button
        onClick={() => setIsCreating(true)}
        className="px-4 py-2 bg-orange-600 text-white rounded hover:bg-blue-700"
      >
        Add Column
      </button>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Column title"
        className="px-3 py-2 border rounded"
        autoFocus
      />
      <button
        type="submit"
        className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
      >
        Add
      </button>
      <button
        type="button"
        onClick={() => setIsCreating(false)}
        className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
      >
        Cancel
      </button>
    </form>
  )
}