import { api } from '@/utils/api'
import { useQuery } from '@tanstack/react-query'

type Params = {
  token: string | null
}

export function useReadMe({ token }: Params) {
  return useQuery({
    queryKey: ['readMe'],
    queryFn: async () => {
      return fetch(`${api}/users/me/${token}`).then((res) => res.json())
    },
  })
}
