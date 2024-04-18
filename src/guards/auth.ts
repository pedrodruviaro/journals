import type { RouteLocationNormalized } from 'vue-router'
import { getCurrentUser } from 'vuefire'

export async function authGuard(to: RouteLocationNormalized) {
  if (to.meta.needsAuth) {
    const currentUser = await getCurrentUser()

    if (!currentUser) {
      return {
        path: '/auth/login',
        query: {
          redirect: to.fullPath
        }
      }
    }
  }
}
