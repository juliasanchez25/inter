import { z } from 'zod'

export const registerSchema = z
  .object({
    name: z.string().min(1, 'Nome é obrigatório.'),
    email: z.string().email('Email deve ser válido.'),
    password: z.string().min(8, 'Senha deve conter ao menos 8 caracteres.'),
    confirmPassword: z.string().min(1, 'Confirmação de senha é obrigatória.'),
  })
  .refine(
    (data) => {
      if (data.password && data.confirmPassword) {
        return data.password === data.confirmPassword
      }
      return true
    },
    {
      message: 'As senhas não coincidem.',
      path: ['confirmPassword'],
    },
  )
