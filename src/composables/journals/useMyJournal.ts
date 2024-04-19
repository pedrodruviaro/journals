import type { Journal } from '@/types'
import { doc, getDoc } from 'firebase/firestore'
import { useToast } from 'primevue/usetoast'
import { onMounted, ref } from 'vue'
import { useFirestore } from 'vuefire'

interface UseMyJournalOptions {
  userId: string
  journalId: string
}

export function useMyJournal({ userId, journalId }: UseMyJournalOptions) {
  const db = useFirestore()
  const toast = useToast()

  const loading = ref(true)
  const journal = ref<Journal>()
  const error = ref(false)

  async function getJournal() {
    if (!userId || !journalId) return

    try {
      loading.value = true

      const docRef = doc(db, 'journals', journalId)
      const docSnap = await getDoc(docRef)

      if (docSnap.exists()) {
        const doc = docSnap.data() as Journal
        if (doc.userId !== userId) {
          error.value = true
          return
        }

        journal.value = doc
        return
      }

      error.value = true
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
