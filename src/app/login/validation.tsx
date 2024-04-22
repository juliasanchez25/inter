import { z } from 'zod'

export const loginSchema = z.object({
  email: z.string().email({
    message: 'Email deve ser válido.',
  }),
  password: z.string().min(1, {
    message: 'Senha é obrigatória.',
  }),
})
