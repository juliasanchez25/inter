import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Login } from './app/login/page'
import { Cadastro } from './app/cadastro/page'

const router = createBrowserRouter([
  {
    path: '/',
    element: <div>Hello world!</div>,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/cadastro',
    element: <Cadastro />,
  },
])

export const Routes = () => {
  return <RouterProvider router={router} />
}
