import { z } from 'zod'
import { useToast } from 'primevue/usetoast'
import { useServices } from '@/composables/services/useServices'
import { ref } from 'vue'
import { Category } from '@/constants/category'
import { useRouter } from 'vue-router'
import type { Journal } from '@/types'
import type { ZodFormattedError } from 'zod'

const schema = z.object({
  title: z.string().min(4, 'Um título é obrigatório'),
  description: z.string().min(1, 'Uma descrição é obrigatória'),
  category: z.nativeEnum(Category, {
    errorMap: () => {
      return { message: 'Defina uma categoria' }
    }
  }),
  content: z.string().min(1, 'Defina um conteúdo'),
  isPublic: z.boolean({ required_error: 'Defina o tipo do jornal' })
})

interface UseJournalCreateOptions {
  userId: string
}

export function useJournalCreate({ userId }: UseJournalCreateOptions) {
  const toast = useToast()
  const services = useServices()
  const router = useRouter()

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
    console.log(journal.value)
    console.log(result)

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

      const response = await services.journals.create({ userId, journal })
      if (response) {
        router.push({ name: 'journals' })
      }

      toast.add({
        severity: 'success',
        detail: 'Jornal criado com sucesso!',
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
