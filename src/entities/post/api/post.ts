import { adminApi, api } from "@/shared/api/api"
import { queryClient } from "@/shared/lib/react-query"
import { useInfiniteQuery, useMutation } from "@tanstack/react-query"
import { PostPayload, PostQueryPayload } from "../model/post"

export const postApi = {
    getPosts: async (query: PostQueryPayload) => {
        const response = await api.post('/post/search', query)
        return response.data
    },
    likePost: async (postId: string) => {
        const response = await api.post(`like/${postId}`)
        return response.data
    },
    dislikePost: async (postId: string) => {
        const response = await api.delete(`like/${postId}`)
        return response.data
    },
    createPost: async (post: PostPayload) => {
        const response = await api.post('/post', post)
        return response.data
    },
    deletePost: async (postId: string) => {
        const response = await api.delete(`/post/${postId}`)
        return response.data
    },
    addFakeLikes: async (postId: string, fakeLikes: number) => {
        const response = await adminApi.post(`/post/${postId}/update-fake-likes`, { fakeLikes })
        return response.data
    }
}

export const usePost = {
    useGetInfinitePosts: (query: PostQueryPayload) => {
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
    useDislikePost: (postId: string) => {
        return useMutation({
            mutationFn: () => postApi.dislikePost(postId),
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: ['posts'] })
            }
        })
    },
    useCreatePost: () => {
        return useMutation({
            mutationFn: (post: PostPayload) => postApi.createPost(post),
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: ['posts'] })
            }
        })
    },
    useDeletePost: (postId: string) => {
        return useMutation({
            mutationFn: () => postApi.deletePost(postId),
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: ['posts'] })
            }
        })
    },
    useAddFakeLikes: (postId: string) => {
        return useMutation({
            mutationFn: (fakeLikes: number) => postApi.addFakeLikes(postId, fakeLikes),
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: ['posts'] })
            }
        })
    }
}

