'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Board } from './components/kanban/Board'

export default function BoardPage() {
  const [isClient, setIsClient] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem('token')

    if (!token) {
      router.push('/login')
    } else {
      setIsClient(true)
    }
  }, [router])

  if (!isClient) {
    return <div className="text-center mt-10">Redirecting...</div>
  }

  return (
    <div className="h-screen">
      <Board />
    </div>
  )
}
