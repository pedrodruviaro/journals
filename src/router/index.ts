import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import LoginView from '@/views/LoginView.vue'
import JournalsDashboardView from '@/views/JournalsDashboardView.vue'
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
      path: '/login',
      name: 'login',
      component: LoginView
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
