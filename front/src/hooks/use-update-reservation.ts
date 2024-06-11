import { IReservation } from '@/models/reservation'
import { api } from '@/utils/api'
import { useMutation } from '@tanstack/react-query'

type Params = {
  onSuccess?: () => void
}

export function useUpdateReservation({ onSuccess }: Params) {
  return useMutation({
    mutationKey: ['updateReservation'],
    mutationFn: async (data: IReservation) => {
      return fetch(`${api}/reservations/${data.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      }).then((res) => res.json())
    },
    onSuccess,
  })
}
