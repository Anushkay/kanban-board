'use client'
import { useState, ChangeEvent, FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import { z } from 'zod'
import { authService } from '../../services/auth.service';

// Validation schemas
const loginSchema = z.object({
  email: z.string().email('Invalid email address').min(1, 'Email is required'),
  password: z.string().min(6, 'Password must be at least 6 characters').min(1, 'Password is required')
})

const signupSchema = loginSchema.extend({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required')
})

type FormData = z.infer<typeof signupSchema>

export default function AuthForm({ type }: { type: 'login' | 'signup' }) {
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
    firstName: '',
    lastName: ''
  })
  const [errors, setErrors] = useState<Partial<FormData>>({})
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (errors[name as keyof FormData]) {
      setErrors(prev => ({ ...prev, [name]: undefined }))
    }
  }

  const validate = (): boolean => {
    try {
      const schema = type === 'login' ? loginSchema : signupSchema
      schema.parse(formData)
      setErrors({})
      return true
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Partial<FormData> = {}
        error.errors.forEach(err => {
          newErrors[err.path[0] as keyof FormData] = err.message
        })
        setErrors(newErrors)
      }
      return false
    }
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!validate()) return

    setIsLoading(true)

    try {
      const response = type === 'login'
        ? await authService.login(formData.email, formData.password)
        : await authService.signup(
            formData.email,
            formData.password,
            formData.firstName,
            formData.lastName
          )

      if (typeof window !== 'undefined') {
        localStorage.setItem('token', response.token)
      }

      router.push('/')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="w-full max-w-md p-8 space-y-6 rounded-lg shadow bg-gray-800">
      <h2 className="text-2xl font-bold text-center">
        {type === 'login' ? 'Login' : 'Sign Up'}
      </h2>

      <form className="space-y-4" onSubmit={handleSubmit}>
        {type === 'signup' && (
          <>
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium">
                First Name
              </label>
              <input
                id="firstName"
                name="firstName"
                type="text"
                className="w-full p-2 mt-1 border rounded"
                value={formData.firstName}
                onChange={handleChange}
              />
              {errors.firstName && <p className="mt-1 text-sm text-red-600">{errors.firstName}</p>}
            </div>
            <div>
              <label htmlFor="lastName" className="block text-sm font-medium">
                Last Name
              </label>
              <input
                id="lastName"
                name="lastName"
                type="text"
                className="w-full p-2 mt-1 border rounded"
                value={formData.lastName}
                onChange={handleChange}
              />
              {errors.lastName && <p className="mt-1 text-sm text-red-600">{errors.lastName}</p>}
            </div>
          </>
        )}

        <div>
          <label htmlFor="email" className="block text-sm font-medium">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            className="w-full p-2 mt-1 border rounded"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            className="w-full p-2 mt-1 border rounded"
            value={formData.password}
            onChange={handleChange}
          />
          {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className={`w-full px-4 py-2 text-white rounded ${
            isLoading ? 'bg-orange-400' : 'bg-orange-600 hover:bg-orange-700'
          }`}
        >
          {isLoading ? 'Processing...' : type === 'login' ? 'Login' : 'Sign Up'}
        </button>
      </form>

      <div className="text-center text-sm text-gray-600">
        {type === 'login' ? (
          <>
            Don't have an account?{' '}
            <button
              type="button"
              onClick={() => router.push('/signup')}
              className="text-blue-600 hover:underline"
            >
              Create one
            </button>
          </>
        ) : (
          <>
            Already have an account?{' '}
            <button
              type="button"
              onClick={() => router.push('/login')}
              className="text-blue-600 hover:underline"
            >
              Login
            </button>
          </>
        )}
      </div>
    </div>
  )
}