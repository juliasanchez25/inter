import { api } from '@/utils/api'
import { useMutation } from '@tanstack/react-query'

type Params = {
  onSuccess?: () => void
}

export function useToggleReadNotification({ onSuccess }: Params) {
  return useMutation({
    mutationFn: async (id: number) => {
      return fetch(`${api}/notifications/read/${id}`, {
        method: 'PATCH',
      }).then((res) => res.json())
    },
    onSuccess,
  })
}
