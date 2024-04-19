import type { Category } from '@/constants/category'
import type { Journal } from '@/types'
import { doc, updateDoc } from 'firebase/firestore'
import { useToast } from 'primevue/usetoast'
import { ref, watchEffect } from 'vue'
import { useFirestore } from 'vuefire'
import { z, type ZodFormattedError } from 'zod'

const schema = z.object({
  title: z.string().min(4, 'Um título é obrigatório'),
  description: z.string().min(1, 'Uma descrição é obrigatória'),
  category: z.string(),
  content: z.string().min(1, 'Defina um conteúdo'),
  isPublic: z.boolean({ required_error: 'Defina o tipo do jornal' })
})

export function useJournalCreate() {
  const toast = useToast()
  const db = useFirestore()

  const loading = ref(false)
  const errors = ref<ZodFormattedError<Journal>>()

  const journal = ref<Journal>({
    title: '',
    description: '',
    category: '' as Category,
    content: '',
    isPublic: false
  })

  function safeParse() {
    const result = schema.safeParse({ ...journal.value })

    if (!result.success) {
      errors.value = result.error.format()
    } else {
      errors.value = undefined
    }

    return result
  }

  async function createJournal() {
    try {
      loading.value = true

      // criar
      console.log(journal.value)

      toast.add({
        severity: 'success',
        detail: 'Jornal atualizado com sucesso',
        life: 2000
      })
    } catch (error) {
      console.error('error', error)
      toast.add({
        severity: 'error',
        detail: 'Algo deu errado...',
        life: 2000
      })
    } finally {
      loading.value = false
    }
  }

  return {
    loading,
    errors,
    journal,
    safeParse,
    createJournal
  }
}
