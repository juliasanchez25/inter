import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { EnterIcon } from '@radix-ui/react-icons'

export function Cadastro() {
  return (
    <section className="w-screen h-screen flex justify-center items-center">
      <Card className="w-[350px]">
        <CardHeader>
          <h2 className="text-lg font-semibold">Cadastro</h2>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Nome</Label>
                <Input id="name" placeholder="Nome" />
              </div>
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
            Cadastrar
          </Button>
          <div className="flex gap-1 text-sm self-start">
            <p>Ou</p>
            <a className="underline" href="/login">
              clique para fazer login
            </a>
          </div>
        </CardFooter>
      </Card>
    </section>
  )
}
