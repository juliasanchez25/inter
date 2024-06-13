import { IUser } from '@/models/user'
import { api } from '@/utils/api'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'

export type LoginResponse = {
  token: string
  user: Omit<IUser, 'password'>
}

type Params = {
  onSuccess?: (response: LoginResponse) => void
  onError?: (error: unknown) => void
}

export function useLogin({ onSuccess, onError }: Params) {
  return useMutation({
    mutationKey: ['login'],
    mutationFn: async (data: Pick<IUser, 'password' | 'email'>) => {
      return axios.post(`${api}/users/login`, data).then((res) => res.data)
    },
    onSuccess,
    onError,
  })
}
