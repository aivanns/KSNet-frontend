import { Filters, SortDirection, QueryPayload } from "@/shared/types/query"

export interface PostComponentProps {
    text: string
    author: string
    date: string
    image?: string
    tags?: string[]
    url?: string
    isFull?: boolean
}

export interface Post {
    id: string
    title: string
    url: string
    ownerId: string
    isVerified: boolean
    description: string
    content: string
    createdAt: string
    updatedAt: string
    postTags: any[]
    isLiked: boolean
    likes: number
  }
  

interface PostFilters extends Filters {
    ownerId?: string
    query?: string
}

interface PostSort {
    createdAt?: SortDirection
}

export type PostQueryPayload = QueryPayload<PostFilters, PostSort>
