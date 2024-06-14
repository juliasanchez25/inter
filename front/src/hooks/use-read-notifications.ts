import { api } from '@/utils/api'
import { useQuery } from '@tanstack/react-query'

export function useReadNotifications<T>() {
  return useQuery<T>({
    queryKey: ['readNotifications'],
    queryFn: async () => {
      return fetch(`${api}/notifications`).then((res) => res.json())
    },
  })
}
