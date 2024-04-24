import LandingPageView from '@/views/LandinPage/LandingPageView.vue'
import DashboardView from '@/views/Dashboard/DashboardView.vue'
import EditorView from '@/views/Editor/EditorView.vue'
import EditorCreateView from '@/views/Editor/EditorCreateView.vue'
import EditorEditView from '@/views/Editor/EditorEditView.vue'
import { createRouter, createWebHistory } from 'vue-router'
import { authGuard } from '@/guards/auth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'landing-page',
      component: LandingPageView
    },
    {
      path: '/auth',
      name: 'auth',
      redirect: { name: 'auth-login' },
      children: [
        {
          path: 'login',
          name: 'auth-login',
          component: () => import('@/views/Auth/AuthLoginView.vue')
        },
        {
          path: 'redirect',
          name: 'auth-redirect',
          component: () => import('@/views/Auth/AuthRedirectView.vue')
        }
      ]
    },
    {
      path: '/my-profile',
      name: 'my-profile',
      meta: {
        needsAuth: true
      },
      component: () => import('@/views/Profile/MyProfileEditorView.vue')
    },
    {
      path: '/journals',
      name: 'journals',
      meta: {
        needsAuth: true
      },
      component: DashboardView
    },
    {
      path: '/editor',
      name: 'editor',
      component: EditorView,
      meta: {
        needsAuth: true
      },
      redirect: { name: 'editor-create' },
      children: [
        {
          path: 'create',
          name: 'editor-create',
          component: EditorCreateView
        },
        {
          path: 'edit/:id',
          name: 'editor-edit',
          props: true,
          component: EditorEditView
        }
      ]
    },
    {
      path: '/user/:id',
      name: 'public-user',
      props: true,
      component: () => import('@/views/Profile/PublicProfileView.vue')
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      props: (route) => ({ path: route.path }),
      component: () => import('@/views/Error/NotFoundView.vue')
    }
  ]
})

router.beforeEach(authGuard)

export default router
