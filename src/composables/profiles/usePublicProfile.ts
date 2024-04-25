import { onMounted, ref, watchEffect } from 'vue'
import { useServices } from '@/composables/services/useServices'
import type { Journal, UserProfile } from '@/types'

interface UsePublicProfileOptions {
  userId: string
}

export function usePublicProfile({ userId }: UsePublicProfileOptions) {
  const services = useServices()

  const loading = ref(false)
  const profile = ref<UserProfile>()
  const journals = ref<Journal[]>()

  async function getPublicProfile(id?: string) {
    try {
      loading.value = true

      const response = await services.profiles.getPublicProfile(id ? id : userId)

      journals.value = response.journals
      profile.value = response.profile

      return
    } catch (error) {
      console.error('error', error)
    } finally {
      loading.value = false
    }
  }

  onMounted(async () => {
    await getPublicProfile()
  })

  return {
    loading,
    profile,
    journals,
    getPublicProfile
  }
}
