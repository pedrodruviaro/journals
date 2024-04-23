import { onMounted, ref } from 'vue'
import { useServices } from '@/composables/services/useServices'
import { useToast } from 'primevue/usetoast'
import type { UserProfile } from '@/types'

interface UseGetProfileOptions {
  userId: string
}

export function useGetProfile({ userId }: UseGetProfileOptions) {
  const loading = ref(true)
  const services = useServices()
  const toast = useToast()

  const profile = ref<UserProfile>()

  async function getProfile() {
    try {
      loading.value = true

      const dbProfile = await services.profiles.getProfile(userId)

      if (dbProfile) {
        profile.value = dbProfile
      }
    } catch (error) {
      toast.add({
        severity: 'error',
        detail: 'Algo deu errado... recarregue e tente novamente',
        life: 6000
      })
    } finally {
      loading.value = false
    }
  }

  onMounted(async () => {
    await getProfile()
  })

  return {
    loading,
    profile,
    getProfile
  }
}
