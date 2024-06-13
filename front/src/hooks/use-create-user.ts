import { IUser } from '@/models/user'
import { api } from '@/utils/api'
import { useMutation } from '@tanstack/react-query'

type Params = {
  onSuccess?: () => void
}

export function useCreateUser({ onSuccess }: Params) {
  return useMutation({
    mutationKey: ['createUser'],
    mutationFn: async (data: Omit<IUser, 'id'>) => {
      return fetch(`${api}/users`, {
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
