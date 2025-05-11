import { toast } from 'react-hot-toast'

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || ''

export const boardService = {
  async getBoard() {
    try {
      const response = await fetch(`${BASE_URL}/board`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      })
      return await response.json()
    } catch (error) {
      toast.error('Failed to fetch board')
      throw error
    }
  },

  async createColumn(title: string) {
    try {
      const response = await fetch(`${BASE_URL}/column`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ title })
      })
      return await response.json()
    } catch (error) {
      toast.error('Failed to create column')
      throw error
    }
  },

  async createTask(columnId: string, title: string, description?: string) {
    try {
      const response = await fetch(`${BASE_URL}/task`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ columnId, title, description })
      })
      return await response.json()
    } catch (error) {
      toast.error('Failed to create task')
      throw error
    }
  },

  async updateTask(taskId: string, updates: any) {
    try {
      const response = await fetch(`${BASE_URL}/task/${taskId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(updates)
      })
      return await response.json()
    } catch (error) {
      toast.error('Failed to update task')
      throw error
    }
  },

  async deleteTask(taskId: string) {
    try {
       await fetch(`${BASE_URL}/task/${taskId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      })
      return true;
    } catch (error) {
      toast.error('Failed to delete task')
      throw error
    }
  }
}