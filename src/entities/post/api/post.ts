import { api } from "@/shared/api/api"
import { QueryPayload } from "@/shared/types/query"
import { useInfiniteQuery } from "@tanstack/react-query"

export const postApi = {
    getPosts: async (query: QueryPayload) => {
        const response = await api.post('/post/search', query)
        return response.data
    }
}

export const usePost = {
    useGetInfinitePosts: (query: QueryPayload) => {
        return useInfiniteQuery({
            queryKey: ['posts', query],
            queryFn: ({ pageParam = 1 }) => postApi.getPosts({ 
                ...query, 
                pagination: { 
                    ...query.pagination, 
                    page: pageParam 
                } 
            }),
            getNextPageParam: (lastPage, allPages) => {
                const pageSize = query.pagination?.count || 10
                if (lastPage.data.length < pageSize) return undefined
                return allPages.length + 1
            },
            initialPageParam: 1
        })
    }
}

