import { useTitle } from '@vueuse/core'

export function useSeoTitle(seoTitle: string) {
  const title = useTitle(`${seoTitle} | Journals`)

  return {
    title
  }
}
