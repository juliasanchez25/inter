import { api } from '@/utils/api'
import { useQuery } from '@tanstack/react-query'

export function useReadReservations<T>() {
  return useQuery<T>({
    queryKey: ['readReservations'],
    queryFn: async () => {
      return fetch(`${api}/reservations`).then((res) => res.json())
    },
  })
}
