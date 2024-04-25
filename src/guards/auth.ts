import { getCurrentUser } from 'vuefire'
import type { RouteLocationNormalized } from 'vue-router'

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
