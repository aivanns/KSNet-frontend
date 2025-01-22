import { api } from "@/shared/api/api"
import { TagQueryPayload } from "../model/tag"
import { useQuery } from "@tanstack/react-query"

const tagApi = {
    getTags: async (query: TagQueryPayload) => {
        const response = api.post('/tag/search', query)
        return response
    }
}

export const useTag = {
    useGetTags: (query: TagQueryPayload) => {
        return useQuery({
            queryKey: ['tags', query],
            queryFn: () => tagApi.getTags(query)
        })
    }
}

