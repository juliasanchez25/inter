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
import { EnterIcon } from '@radix-ui/react-icons'
import { loginSchema } from './validation'
import { zodResolver } from '@hookform/resolvers/zod'

type UserLoginFormData = {
  email: string
  password: string
}

export const Login = () => {
  const submit = (values: UserLoginFormData) => {
    console.log('values', values)
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserLoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: 'all',
  })

  return (
    <section className="w-screen h-screen flex justify-center items-center">
      <Card className="p-4 w-[21rem] md:w-[25rem]">
        <CardHeader>
          <CardTitle className="text-xl">Login</CardTitle>
          <CardDescription>Entre com seu e-mail e senha.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(submit)}>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-2">
                <Label htmlFor="email">E-mail*</Label>
                <Input
                  id="email"
                  placeholder="exemplo@gmail.com"
                  type="email"
                  {...register('email')}
                  error={errors.email?.message}
                />
              </div>
              <div className="flex flex-col space-y-2">
                <Label htmlFor="password">Senha*</Label>
                <Input
                  id="password"
                  placeholder="*******"
                  type="password"
                  {...register('password')}
                  error={errors.password?.message}
                />
              </div>
              <Button type="submit" className="mt-3 w-full gap-2">
                <EnterIcon />
                Entrar
              </Button>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col space-y-2">
          <a className="self-start text-sm underline" href="#">
            Esqueci a senha
          </a>
          <div className="self-start mt-4 text-sm">
            Ainda não possui conta?{' '}
            <a className="underline" href="/cadastro">
              Cadastre-se
            </a>
          </div>
        </CardFooter>
      </Card>
    </section>
  )
}
