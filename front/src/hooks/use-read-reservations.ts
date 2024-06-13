import { api } from '@/utils/api'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

export function useReadReservations<T>() {
  return useQuery<T>({
    queryKey: ['readReservations'],
    queryFn: async () => {
      return axios.get(`${api}/reservations`).then((res) => res.data)
    },
  })
}
