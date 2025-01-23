import { api } from "@/shared/api/api"
import { User } from "../model/user"
import { useMutation, useQuery } from "@tanstack/react-query"
import { queryClient } from "@/shared/lib/react-query"

export const userApi = {
  getMe: async () => {
    const response = await api.get<User>('/users/me')
    return response.data
  },
  uploadAvatar: async (file: File) => {
    const formData = new FormData()
    formData.append('file', file)
    const response = await api.put('/avatar', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    return response.data
  }
}

const useUserApi = {
  useGetMe: () => {
    return useQuery({
      queryKey: ['user'],
      queryFn: userApi.getMe
    })
  },
  useMutateAvatar: () => {
    return useMutation({
      mutationFn: userApi.uploadAvatar,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['user'] })
      }
    })
  }
}

export default useUserApi