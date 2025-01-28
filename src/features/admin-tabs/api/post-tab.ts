import { adminApi } from "@/shared/api/api"
import { AdminPostQueryPayload } from "../model/post-tab"
import { useMutation, useQuery } from "@tanstack/react-query"
import { queryClient } from "@/shared/lib/react-query"

const adminPostApi = {
    getUnverfiedPosts: async (query: AdminPostQueryPayload) => {
        const { data } = await adminApi.post('post/search', query)
        return data
    },
    verifyPost: async (id: string) => {
        const { data } = await adminApi.put(`post/${id}/verify`)
        return data
    },
    deletePost: async (id: string) => {
        const { data } = await adminApi.delete(`post/${id}`)
        return data
    },
    addPostToTop: async (id: string, place: number) => {
        const { data } = await adminApi.post(`post/${id}/add-to-top`, { place })
        return data
    }
}

export const useAdminPostApi = {
    useGetUnverifiedPosts: (query: AdminPostQueryPayload) => {
        return useQuery({
            queryKey: ['posts', query],
            queryFn: () => adminPostApi.getUnverfiedPosts(query),
        })
    },
    useVerifyPost: () => {
        return useMutation({
            mutationFn: (id: string) => adminPostApi.verifyPost(id),
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: ['posts'] })
            }
        })
    },
    useDeletePost: () => {
        return useMutation({
            mutationFn: (id: string) => adminPostApi.deletePost(id),
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: ['posts'] })
            }
        })
    },
    useAddPostToTop: () => {
        return useMutation({
            mutationFn: ({ id, place }: { id: string; place: number }) => adminPostApi.addPostToTop(id, place),
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: ['posts'] })
            }
        })
    }
}