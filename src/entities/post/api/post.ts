import { api } from "@/shared/api/api"
import { QueryPayload } from "@/shared/types/query"
import { useQuery } from "@tanstack/react-query"

export const postApi = {
    getPosts: async (query: QueryPayload) => {
        const response = await api.post('/post/search', query)
        return response.data
    }
}

export const usePost = {
    useGetPosts: (query: QueryPayload) => {
        return useQuery({
            queryKey: ['posts', query],
            queryFn: () => postApi.getPosts(query)
        })
    }
}

