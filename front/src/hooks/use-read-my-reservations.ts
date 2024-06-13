import { api } from '@/utils/api'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
type Params = {
  userId: number
}

export function useReadMyReservations<T>({ userId }: Params) {
  return useQuery<T>({
    queryKey: ['readMyReservations'],
    queryFn: async () => {
      return axios
        .get(`${api}/reservations/me/${userId}`)
        .then((res) => res.data)
    },
  })
}
