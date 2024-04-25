import JournalsServices from '@/services/journals'
import ProfilesServices from '@/services/profiles'
import { useFirestore } from 'vuefire'

export function useServices() {
  const database = useFirestore()

  return {
    journals: JournalsServices(database),
    profiles: ProfilesServices(database)
  }
}
