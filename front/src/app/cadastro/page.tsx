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
import { PersonIcon } from '@radix-ui/react-icons'

type UserRegisterFormData = {
  name: string
  email: string
  password: string
  confirmPassword: string
}

export const Cadastro = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserRegisterFormData>({
    resolver: zodResolver(registerSchema),
    mode: 'all',
  })

  const submit = handleSubmit((values) => {
    console.log('values', values)
  })

  console.log(errors)

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
              <Button type="submit" className="mt-3 w-full gap-2">
                <PersonIcon />
                Cadastrar
              </Button>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col space-y-2">
          <a className="self-start text-sm underline" href="#">
            Esqueci a senha
          </a>

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
