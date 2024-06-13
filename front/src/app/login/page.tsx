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
import { EnterIcon, ReloadIcon } from '@radix-ui/react-icons'
import { loginSchema } from './validation'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate } from 'react-router-dom'
import { useLogin } from '@/hooks/use-login'
import { toast } from '@/components/ui/use-toast'
import { useUser } from '@/context/user-context'

type UserLoginFormData = {
  email: string
  password: string
}

export const Login = () => {
  const navigate = useNavigate()
  const { executeSetUser } = useUser()

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<UserLoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: 'all',
  })

  const login = useLogin({
    onSuccess: (response) => {
      toast({
        description: 'Login realizado com sucesso',
        title: 'Sucesso',
        className: 'bg-emerald-500 text-white',
      })
      executeSetUser(response.user, response.token)
      navigate(
        response.user.role === 'admin' ? '/reservas' : '/minhas-reservas',
      )
    },
    onError: () => {
      setError('email', {
        type: 'custom',
        message: 'Email ou senha inválidos',
      })
    },
  })

  const submit = (values: UserLoginFormData) => {
    login.mutate(values)
  }

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
              <Button
                type="submit"
                className="mt-3 w-full gap-2"
                disabled={login.isPending}
              >
                {login.isPending ? (
                  <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <EnterIcon />
                )}
                Entrar
              </Button>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col space-y-2">
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
