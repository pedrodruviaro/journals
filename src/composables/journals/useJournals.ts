import { onMounted, ref } from 'vue'
import { useToast } from 'primevue/usetoast'
import { useServices } from '@/composables/services/useServices'
import type { Journal } from '@/types'

interface UseJournalsOptions {
  userId: string
}

export function useJournals({ userId }: UseJournalsOptions) {
  const toast = useToast()
  const services = useServices()

  const loading = ref(true)
  const journals = ref<Journal[]>([])

  async function getJournals() {
    try {
      if (!userId) return

      loading.value = true

      const response = await services.journals.readAll(userId)

      if (response.value) {
        journals.value = response.value
        return
      }
    } catch (error) {
      toast.add({
        severity: 'error',
        detail: 'Algo deu errado. Recarregue e tente novamente',
        life: 2000
      })
    } finally {
      loading.value = false
    }
  }

  onMounted(async () => await getJournals())

  return {
    loading,
    journals
  }
}
