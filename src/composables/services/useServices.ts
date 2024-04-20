import { useFirestore } from 'vuefire'
import JournalsServices from '@/services/journals'

export function useServices() {
  const database = useFirestore()

  return {
    journals: JournalsServices(database)
  }
}
