import { IConfigurationModel } from '@/models/configuration'
import { api } from '@/utils/api'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'

type Params = {
  onSuccess: () => void
}

export function useCreateConfiguration({ onSuccess }: Params) {
  return useMutation({
    mutationKey: ['createConfiguration'],
    mutationFn: async (data: Omit<IConfigurationModel, 'id'>) => {
      return axios
        .post(`${api}/restaurant/configuration`, data)
        .then((res) => res.data)
    },
    onSuccess,
  })
}
