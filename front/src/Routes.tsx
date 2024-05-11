import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Login } from './app/login/page'
import { Cadastro } from './app/cadastro/page'
import { Dashboard } from './app/dashboard/page'
import { Reserva } from './app/reserva/page'
import { Home } from './app/home/page'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/cadastro',
    element: <Cadastro />,
  },
  {
    path: '/dashboard',
    element: <Dashboard />,
  },
  {
    path: '/reserva',
    element: <Reserva />,
  },
])

export const Routes = () => {
  return <RouterProvider router={router} />
}
