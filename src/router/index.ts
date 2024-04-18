import { createRouter, createWebHistory } from 'vue-router'
import LandingPageView from '@/views/LandinPage/LandingPgeView.vue'
import AuthLoginView from '@/views/Auth/AuthLoginView.vue'
import DashboardView from '@/views/Dashboard/DashboardView.vue'
import AuthRedirectView from '@/views/Auth/AuthRedirectView.vue'
import EditorView from '@/views/Editor/EditorView.vue'
import EditorCreateView from '@/views/Editor/EditorCreateView.vue'
import EditorEditView from '@/views/Editor/EditorEditView.vue'

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
          component: AuthLoginView
        },
        {
          path: 'redirect',
          name: 'auth-redirect',
          component: AuthRedirectView
        }
      ]
    },

    {
      path: '/journals',
      name: 'journals',
      component: DashboardView
    },
    {
      path: '/editor',
      name: 'editor',
      component: EditorView,
      redirect: { name: 'editor-create' },
      children: [
        {
          path: 'create',
          name: 'editor-create',
          component: EditorCreateView
        },
        {
          path: 'edit',
          name: 'editor-edit',
          component: EditorEditView
        }
      ]
    }
  ]
})

export default router
