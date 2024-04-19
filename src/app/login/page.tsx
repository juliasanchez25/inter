import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { EnterIcon } from '@radix-ui/react-icons'

export function Login() {
  return (
    <section className="w-screen h-screen flex justify-center items-center">
      <Card className="w-[350px]">
        <CardHeader>
          <h2 className="text-lg font-semibold">Login</h2>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">E-mail</Label>
                <Input id="email" placeholder="exemplo@gmail.com" />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Senha</Label>
                <Input id="password" placeholder="*******" />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col gap-4 justify-between">
          <Button className="w-full flex gap-2">
            <EnterIcon />
            Entrar
          </Button>
          <div className="flex gap-1 text-sm self-start">
            <p>Não possui conta?</p>
            <a className="underline" href="/cadastro">
              Clique para se cadastrar
            </a>
          </div>
        </CardFooter>
      </Card>
    </section>
  )
}
