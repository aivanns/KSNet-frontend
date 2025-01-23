export interface User {
  id: string
  email: string
  username: string
  roleId: string
  firstName: string
  lastName: string
  groupId: string
  isActive: boolean
  createdAt: string
  updatedAt: string
  role: Role
  userMedias: UserMedia[]
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

export interface Media {
  id: string
  url: string
  filename: string
  type: string
  createdAt: string
  updatedAt: string
}
