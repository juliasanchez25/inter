import { api } from '@/utils/api'
import { useMutation } from '@tanstack/react-query'

type Params = {
  onSuccess?: () => void
}

export function useDeleteReservation({ onSuccess }: Params) {
  return useMutation({
    mutationKey: ['deleteReservation'],
    mutationFn: async (id: string) => {
      return fetch(`${api}/reservations/${id}`, {
        method: 'DELETE',
      }).then((res) => res.json())
    },
    onSuccess,
  })
}
