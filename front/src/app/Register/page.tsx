'use client'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { registerSchema } from './validation'
import { PersonIcon, ReloadIcon } from '@radix-ui/react-icons'
import { useCreateUser } from '@/hooks/use-create-user'
import { toast } from '@/components/ui/use-toast'
import { useNavigate } from 'react-router-dom'

type UserRegisterFormData = {
  name: string
  email: string
  password: string
  confirmPassword: string
}

export const Register = () => {
  const navigate = useNavigate()

  const createUser = useCreateUser({
    onSuccess: () => {
      toast({
        description: 'Conta criada com sucesso.',
      })
      navigate('/login')
    },
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserRegisterFormData>({
    resolver: zodResolver(registerSchema),
    mode: 'all',
  })

  const submit = handleSubmit((values) => {
    createUser.mutate({
      email: values.email,
      name: values.name,
      password: values.password,
      role: 'user',
    })
  })

  return (
    <section className="w-screen h-screen flex justify-center items-center">
      <Card className="p-4 w-[21rem] md:w-[25rem]">
        <CardHeader>
          <CardTitle className="text-xl">Cadastro</CardTitle>
          <CardDescription>Crie sua conta, fácil e rápido.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={submit}>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-2">
                <Label htmlFor="name">Nome</Label>
                <Input
                  id="name"
                  placeholder="Zé da Silva"
                  type="text"
                  {...register('name')}
                  error={errors.name?.message}
                />
              </div>
              <div className="flex flex-col space-y-2">
                <Label htmlFor="email">E-mail</Label>
                <Input
                  id="email"
                  placeholder="exemplo@gmail.com"
                  {...register('email')}
                  error={errors.email?.message}
                />
              </div>
              <div className="flex flex-col space-y-2">
                <Label htmlFor="password">Senha</Label>
                <Input
                  id="password"
                  placeholder="*******"
                  type="password"
                  {...register('password')}
                  error={errors.password?.message}
                />
              </div>
              <div className="flex flex-col space-y-2">
                <Label htmlFor="confirmPassword">Confirmar senha</Label>
                <Input
                  id="confirmPassword"
                  placeholder="*******"
                  type="password"
                  {...register('confirmPassword')}
                  error={errors.confirmPassword?.message}
                />
              </div>
              <Button
                type="submit"
                className="mt-3 w-full gap-2"
                disabled={createUser.isPending}
              >
                {createUser.isPending ? (
                  <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <PersonIcon />
                )}
                Cadastrar
              </Button>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col space-y-2">
          <div className="self-start mt-4 text-sm">
            Já possui conta?{' '}
            <a className="underline" href="/login">
              Fazer login
            </a>
          </div>
        </CardFooter>
      </Card>
    </section>
  )
}
