import { useFirestore } from 'vuefire'
import JournalsServices from '@/services/journals'
import ProfilesServices from '@/services/profiles'

export function useServices() {
  const database = useFirestore()

  return {
    journals: JournalsServices(database),
    profiles: ProfilesServices(database)
  }
}
