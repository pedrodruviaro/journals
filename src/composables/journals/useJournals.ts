import { onMounted, ref } from 'vue'
import type { Journal } from '@/types'
import { useCurrentUser, useFirestore } from 'vuefire'
import { collection, query, where, getDocs } from 'firebase/firestore'
import { useToast } from 'primevue/usetoast'

export function useJournals() {
  const toast = useToast()
  const db = useFirestore()
  const user = useCurrentUser()

  const loading = ref(true)
  const journals = ref<Journal[]>([])

  async function getJournals() {
    try {
      if (!user.value) return
      loading.value = true

      const q = query(collection(db, 'journals'), where('userId', '==', user.value?.uid))
      const querySnapshot = await getDocs(q)
      querySnapshot.forEach((doc) => {
        const journal = doc.data() as Journal
        journal.id = doc.id

        journals.value.push(journal)
      })
    } catch (error) {
      toast.add({
        severity: 'error',
        detail: 'Something gone wrong...',
        life: 2000
      })
    } finally {
      loading.value = false
    }
  }

  onMounted(async () => {
    await getJournals()
  })

  return {
    loading,
    journals,
    getJournals
  }
}
