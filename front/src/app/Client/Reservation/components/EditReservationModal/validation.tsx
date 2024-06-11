import { transformPhoneToNumber } from '@/utils/masks'
import { z } from 'zod'
import { subDays } from 'date-fns'

export const editReservationModalSchema = z.object({
  phone: z
    .string()
    .min(1, 'Escolha um telefone')
    .refine(
      (val) => {
        return transformPhoneToNumber(val).length > 10
      },
      {
        message: 'Telefone inválido',
      },
    ),
  date: z
    .date()
    .min(subDays(new Date(), 1), 'A data não pode ser anterior a atual'),
  peopleQuantity: z
    .string()
    .min(1, 'Escolha a quantidade de pessoas')
    .refine((val) => !Number.isNaN(parseInt(val, 10)), {
      message: 'Expected number, received a string',
    })
    .transform((val) => parseInt(val, 10))
    .refine((val) => val > 0, { message: 'Quantidade inválida' })
    .refine((val) => val <= 10, { message: 'Máximo de 10 pessoas' }),
})
