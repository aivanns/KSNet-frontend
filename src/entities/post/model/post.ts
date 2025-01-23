import { Filters, SortDirection, QueryPayload } from "@/shared/types/query"

export interface PostComponentProps {
    id: string
    text: string
    author: Owner
    date: string
    image?: string
    tags?: Tag[]
    url?: string
    isFull?: boolean
    isLiked?: boolean
    likes?: number
    likeId?: string
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
    postMedias: Media[]
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

  
  export interface Media {
    media: {
        url: string
        id: string
    }
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
