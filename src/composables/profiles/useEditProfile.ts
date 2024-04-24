import { ref } from 'vue'
import { z } from 'zod'
import { useServices } from '@/composables/services/useServices'
import { useToast } from 'primevue/usetoast'
import type { ZodFormattedError } from 'zod'
import type { UserAditionalInfos } from '@/types'

const schema = z.object({
  name: z.string().trim().min(4, 'Deve conter no mínimo 4 caracters'),
  site: z.union([z.literal(''), z.string().trim().url('Insira uma URL válida')]),
  bio: z.union([
    z.literal(''),
    z
      .string()
      .trim()
      .max(300, 'Deve conter no máximo 300 caracteres')
      .min(4, 'Deve conter no mínimo 4 caracteres')
  ])
})

interface UseEditProfileOptions {
  userId: string
}

export function useEditProfile({ userId }: UseEditProfileOptions) {
  const services = useServices()
  const toast = useToast()

  const loading = ref(false)
  const errors = ref<ZodFormattedError<UserAditionalInfos>>()

  const userInfos = ref<UserAditionalInfos>({
    bio: '',
    site: '',
    name: ''
  })

  function safeParse() {
    const result = schema.safeParse(userInfos.value)

    if (!result.success) {
      errors.value = result.error.format()
    } else {
      errors.value = undefined
    }

    return result
  }

  async function updateProfile() {
    try {
      const isValid = safeParse().success
      if (!isValid) return

      loading.value = true

      await services.profiles.updateProfile({ userId, userInfos: userInfos.value })

      toast.add({
        severity: 'success',
        detail: 'Alterações salvas com sucesso!',
        life: 2000
      })
    } catch (error) {
      console.error('error', error)

      toast.add({
        severity: 'error',
        detail: 'Falha ao salvar as alterações',
        life: 2000
      })
    } finally {
      loading.value = false
    }
  }

  return {
    loading,
    errors,
    userInfos,
    safeParse,
    updateProfile
  }
}
