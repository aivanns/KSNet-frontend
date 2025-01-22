'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { useUserStore } from '@/entities/user/model/store'
import { User } from '@/entities/user/model/user'
import authApi from '@/features/auth/api/auth'
import { toast } from 'sonner'

interface SessionContextType {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  logout: () => Promise<void>
  refreshSession: () => Promise<boolean>
}

const SessionContext = createContext<SessionContextType | undefined>(undefined)

export function SessionProvider({ children }: { children: React.ReactNode }) {
  const { user, fetchUser } = useUserStore()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const initSession = async () => {
      const token = localStorage.getItem('token')
      if (token) {
        await fetchUser()
      }
      setIsLoading(false)
    }

    initSession()
  }, [])

  const logout = async () => {
    try {
      await authApi.logout()
      localStorage.removeItem('token')
      window.location.reload()
      toast.success('Вы успешно вышли из аккаунта')
    } catch (error) {
      toast.error('Ошибка при выходе из аккаунта')
    }
  }

  const refreshSession = async () => {
    try {
      const { accessToken } = await authApi.refresh()
      localStorage.setItem('token', accessToken)
      await fetchUser()
      return true
    } catch (error) {
      return false
    }
  }

  return (
    <SessionContext.Provider 
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        logout,
        refreshSession
      }}
    >
      {children}
    </SessionContext.Provider>
  )
}

export function useSession() {
  const context = useContext(SessionContext)
  if (context === undefined) {
    throw new Error('useSession must be used within a SessionProvider')
  }
  return context
} 