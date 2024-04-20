import { z } from 'zod'
import { useToast } from 'primevue/usetoast'
import { ref, watchEffect } from 'vue'
import { useServices } from '@/composables/services/useServices'
import { Category } from '@/constants/category'
import type { ZodFormattedError } from 'zod'
import type { Journal } from '@/types'
import type { Ref } from 'vue'

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

interface UseJournalUpdateOptions {
  journal: Ref<Journal | undefined>
  id?: string
}

export function useJournalUpdate({ journal, id }: UseJournalUpdateOptions) {
  const toast = useToast()
  const services = useServices()

  const loading = ref(false)
  const errors = ref<ZodFormattedError<Journal>>()

  const journalValues = ref<Journal>({
    id: '',
    title: '',
    description: '',
    category: '' as Category,
    content: '',
    isPublic: false
  })

  function safeParse() {
    const result = schema.safeParse({ ...journalValues.value })

    if (!result.success) {
      errors.value = result.error.format()
    } else {
      errors.value = undefined
    }

    return result
  }

  async function updateJournal() {
    if (!journal.value || !id || !safeParse().success) return

    try {
      loading.value = true

      await services.journals.update({ journal: journalValues })

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

  watchEffect(() => {
    if (!journal.value) return

    journalValues.value = {
      id: id,
      title: journal.value.title,
      description: journal.value.description,
      category: journal.value.category,
      content: journal.value.content,
      isPublic: journal.value.isPublic
    }
  })

  return {
    loading,
    errors,
    journalValues,
    safeParse,
    updateJournal
  }
}
