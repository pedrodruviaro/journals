import { Category } from '@/constants/category'
import type { User } from 'firebase/auth'

export type Journal = {
  category: Category
  content: string
  createdAt?: string
  description: string
  isPublic: boolean
  title: string
  updatedAt?: string
  userId?: string
  id?: string
}

type UserPartial = Pick<User, 'photoURL' | 'email'>

export type UserProfile = UserPartial & {
  bio?: string
  site?: string
  name: string
}
