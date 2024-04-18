import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import AuthLoginView from '@/views/AuthLoginView.vue'
import JournalsDashboardView from '@/views/JournalsDashboardView.vue'
import AuthRedirectView from '@/views/AuthRedirectView.vue'
import EditorView from '@/views/EditorView.vue'
import JournalCreateView from '@/views/JournalCreateView.vue'
import JournalEditView from '@/views/JournalEditView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'landing-page',
      component: HomeView
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
      component: JournalsDashboardView
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
          component: JournalCreateView
        },
        {
          path: 'edit',
          name: 'editor-edit',
          component: JournalEditView
        }
      ]
    }
  ]
})

export default router
