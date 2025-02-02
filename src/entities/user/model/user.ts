import { Filters, QueryPayload, SortDirection } from "@/shared/types/query"

export interface User {
  id: string
  email: string
  username: string
  firstName: string
  lastName: string
  createdAt: string
  updatedAt: string
  group: Group
  userMedias: UserMedia[]
  likes: Like[]
  role: Role
}

export interface Group {
  id: string
  name: string
  createdAt: string
  updatedAt: string
}

export interface Role {
  id: string
  name: string
  createdAt: string
  updatedAt: string
}

export interface UserMedia {
  userId: string
  mediaId: string
  createdAt: string
  updatedAt: string
  media: Media
}

export interface Like {
  id: string
  userId: string
  postId: string
  createdAt: string
  updatedAt: string
}

export interface Media {
  id: string
  url: string
  filename: string
  type: string
  createdAt: string
  updatedAt: string
}

export interface UserFilters extends Filters {
  email?: string
  firstName?: string
  lastName?: string
}
  
export interface UserSort {
  email?: SortDirection
  firstName?: SortDirection
  lastName?: SortDirection
}

export type UserQueryPayload = QueryPayload<UserFilters, UserSort>

