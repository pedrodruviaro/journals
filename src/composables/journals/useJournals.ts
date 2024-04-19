import { onMounted, ref } from 'vue'
import type { Journal } from '@/types'
import { useFirestore } from 'vuefire'
import { collection, query, where, getDocs } from 'firebase/firestore'
import { useToast } from 'primevue/usetoast'

interface UseJournalsOptions {
  userId: string
}

export function useJournals({ userId }: UseJournalsOptions) {
  const toast = useToast()
  const db = useFirestore()

  const loading = ref(true)
  const journals = ref<Journal[]>([])

  async function getJournals() {
    try {
      if (!userId) return
      loading.value = true

      const q = query(collection(db, 'journals'), where('userId', '==', userId))
      const querySnapshot = await getDocs(q)
      querySnapshot.forEach((doc) => {
        const journal = doc.data() as Journal
        journal.id = doc.id

        journals.value.push(journal)
      })
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
    journals,
    getJournals
  }
}
