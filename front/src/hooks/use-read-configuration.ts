import { api } from '@/utils/api'
import { useQuery } from '@tanstack/react-query'

export function useReadConfiguration() {
  return useQuery({
    queryKey: ['readConfiguration'],
    queryFn: async () => {
      const response = await fetch(`${api}/restaurant/configuration`)
      const data = await response.json()
      return data
    },
  })
}
