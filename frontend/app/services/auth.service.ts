import { toast } from 'react-hot-toast'

interface AuthResponse {
  token: string
  user?: {
    id: string
    email: string
    firstName?: string
    lastName?: string
  }
}

export const authService = {
  async login(email: string, password: string): Promise<AuthResponse> {
    return this.makeAuthRequest('/auth/login', { email, password })
  },

  async signup(
    email: string, 
    password: string, 
    firstName: string, 
    lastName: string
  ): Promise<AuthResponse> {
    return this.makeAuthRequest('/auth/signup', { 
      email, 
      password, 
      firstName, 
      lastName 
    })
  },

  async makeAuthRequest(endpoint: string, body: any): Promise<AuthResponse> {
    try {
      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || ''
      const response = await fetch(`${baseUrl}${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      })

      const data = await response.json()
      const token = data?.data?.token;


      if (!response.ok) {
        throw new Error(data.message || 'Authentication failed')
      }

      if (typeof window !== 'undefined') {
      localStorage.setItem('token',token)
      document.cookie = `token=${token}; path=/`
    }
      return data.data;
    } catch (error: any) {
      toast.error(error.message || 'Authentication failed')
      throw error
    }
  }
}