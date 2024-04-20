import { useToast } from 'primevue/usetoast'
import { onMounted, ref } from 'vue'
import { useServices } from '@/composables/services/useServices'
import type { Journal } from '@/types'

interface UseMyJournalOptions {
  userId: string
  journalId: string
}

export function useMyJournal({ userId, journalId }: UseMyJournalOptions) {
  const toast = useToast()
  const services = useServices()

  const loading = ref(true)
  const journal = ref<Journal>()
  const error = ref(false)

  async function getJournal() {
    if (!userId || !journalId) return

    try {
      loading.value = true

      const response = await services.journals.readOne({ journalId, userId })
      if (!response) {
        error.value = true
        return
      }

      journal.value = response
      return
    } catch (error) {
      console.error('error', error)
      toast.add({
        severity: 'error',
        detail: 'Algo deu errado. Recarregue e tente novamente'
      })
    } finally {
      loading.value = false
    }
  }

  onMounted(async () => await getJournal())

  return {
    loading,
    journal,
    error,
    getJournal
  }
}
