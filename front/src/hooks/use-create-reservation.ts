import { IReservation } from '@/models/reservation'
import { api } from '@/utils/api'
import { useMutation } from '@tanstack/react-query'

type Params = {
  onSuccess?: () => void
}

export function useCreateReservation({ onSuccess }: Params) {
  return useMutation({
    mutationKey: ['createReservation'],
    mutationFn: async (data: Omit<IReservation, 'id'>) => {
      return fetch(`${api}/reservations`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      }).then((res) => res.json())
    },
    onSuccess,
  })
}
