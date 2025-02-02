import { UserQueryPayload } from "@/entities/user/model/user"
import { adminApi } from "@/shared/api/api"
import { useQuery } from "@tanstack/react-query"

const adminUserApi = {
    getUsers: async (query: UserQueryPayload) => {
        const { data } = await adminApi.post('users/search', query)
        return data
    }
}

export const useAdminUserApi = {
    useGetUsers: (query: UserQueryPayload) => {
        return useQuery({
            queryKey: ['users', query],
            queryFn: () => adminUserApi.getUsers(query),
        })
    }
}