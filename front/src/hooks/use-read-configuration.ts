import { api } from '@/utils/api'
import { useQuery } from '@tanstack/react-query'

export function useReadConfiguration<T>() {
  return useQuery<T>({
    queryKey: ['readConfiguration'],
    queryFn: async () => {
      const response = await fetch(`${api}/restaurant/configuration`)
      const data = await response.json()
      return data
    },
  })
}
