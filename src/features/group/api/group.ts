import { api } from "@/shared/api/api"

import { GroupQueryPayload } from "../model/group"
import { useQuery } from "@tanstack/react-query"

const groupApi = {
    getGroups: async (payload: GroupQueryPayload) => {
        const response = await api.post('/group/search', payload)
        return response.data
    }
}

export const useGroupApi = {
    useGetGroups: () => {
        return useQuery({
            queryKey: ['groups'],
            queryFn: () => groupApi.getGroups({ pagination: { page: 1, count: 100 }, filters: {}, sort: {name: 'desc'} }),
        })
    }
}

export default useGroupApi