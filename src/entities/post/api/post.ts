import { api } from "@/shared/api/api"
import { queryClient } from "@/shared/lib/react-query"
import { QueryPayload } from "@/shared/types/query"
import { useInfiniteQuery, useMutation } from "@tanstack/react-query"

export const postApi = {
    getPosts: async (query: QueryPayload) => {
        const response = await api.post('/post/search', query)
        return response.data
    },
    likePost: async (postId: string) => {
        const response = await api.post(`like/${postId}`)
        return response.data
    },
    dislikePost: async (likeId: string) => {
        const response = await api.delete(`dislike/${likeId}`)
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
    },
    useLikePost: (postId: string) => {
        return useMutation({
            mutationFn: () => postApi.likePost(postId),
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: ['posts'] })
            }
        })
    },
    useDislikePost: (likeId: string) => {
        return useMutation({
            mutationFn: () => postApi.dislikePost(likeId),
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: ['posts'] })
            }
        })
    }
}

