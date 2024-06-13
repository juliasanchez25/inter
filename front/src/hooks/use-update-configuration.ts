import { IConfigurationModel } from '@/models/configuration'
import { api } from '@/utils/api'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'

type Params = {
  onSuccess: () => void
}

export function useUpdateConfiguration({ onSuccess }: Params) {
  return useMutation({
    mutationKey: ['updateConfiguration'],
    mutationFn: async (data: IConfigurationModel) => {
      return axios
        .put(`${api}/restaurant/configuration/${data.id}`, data)
        .then((res) => res.data)
    },
    onSuccess,
  })
}
