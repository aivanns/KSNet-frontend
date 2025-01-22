export interface User {
  id: string
  email: string
  roleId: string
  firstName: string
  lastName: string
  groupId: string
  isActive: boolean
  createdAt: string
  updatedAt: string
  role: Role
  userMedias: any[]
}

export interface Role {
  id: string
  name: string
  createdAt: string
  updatedAt: string
}

