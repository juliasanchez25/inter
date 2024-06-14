import { api } from '@/utils/api'
import { useMutation } from '@tanstack/react-query'

type Params = {
  onSuccess?: () => void
}

export function useDeleteNotification({ onSuccess }: Params) {
  return useMutation({
    mutationFn: async (notificationId: number) => {
      return fetch(`${api}/notifications/${notificationId}`, {
        method: 'DELETE',
      }).then((res) => res.json())
    },
    onSuccess,
  })
}
