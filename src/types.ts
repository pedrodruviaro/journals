import { Category } from '@/constants/category'

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
