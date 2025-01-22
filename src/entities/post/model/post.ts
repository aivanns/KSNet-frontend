import { Filters, SortDirection, QueryPayload } from "@/shared/types/query"

export interface PostComponentProps {
    text: string
    author: string
    date: string
    image?: string
    tags?: Tag[]
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
    postTags: PostTag[]
    postMedias: PostMedia[]
    owner: Owner
    isLiked: boolean
    likes: number
  }
  
  export interface PostTag {
    tag: Tag
  }
  
  export interface Tag {
    name: string
    id: string
  }
  
  export interface PostMedia {
    media: Media
  }
  
  export interface Media {
    url: string
    id: string
  }
  
  export interface Owner {
    id: string
    firstName: string
    userMedias: Media[]
    lastName: string
  }
  

export interface PostFilters extends Filters {
    ownerId?: string
    query?: string
    tags?: string[]
}

export interface PostSort {
    createdAt?: SortDirection
}

export type PostQueryPayload = QueryPayload<PostFilters, PostSort>
