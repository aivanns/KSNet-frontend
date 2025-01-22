import { toast } from 'sonner'
import { useUserStore } from '@/entities/user/model/store'
import authApi from '@/features/auth/api/auth'

export const useSession = () => {
  const { user, fetchUser } = useUserStore()

  const logout = async () => {
    try {
      await authApi.logout()
      localStorage.removeItem('token')
      window.location.reload()
      toast.success('Вы успешно вышли из аккаунта')
    } catch {
      toast.error('Ошибка при выходе из аккаунта')
    }
  }

  const refreshSession = async () => {
    try {
      const { accessToken } = await authApi.refresh()
      localStorage.setItem('token', accessToken)
      await fetchUser()
      return true
    } catch {
      return false
    }
  }

  return {
    user,
    isAuthenticated: !!user,
    logout,
    refreshSession
  }
} 