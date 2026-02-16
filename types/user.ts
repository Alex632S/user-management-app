export interface User {
  id: string
  name: string
  email: string
  role: 'admin' | 'editor' | 'viewer'
  status: 'active' | 'blocked'
  registeredAt: string
  avatar?: string
  lastLogin?: string
}

export type NewUser = Omit<User, 'id' | 'registeredAt' | 'lastLogin' | 'avatar'>

export type UpdateUser = Partial<Omit<User, 'id'>>