import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Login } from './app/Login/page'
import { Register } from './app/Register/page'
import { Dashboard } from './app/Restaurant/Dashboard/page'
import { Reservation } from './app/Client/Reservation/page'
import { Home } from './app/Home/page'
import { RestaurantSettings } from './app/Restaurant/RestaurantSettings/page'
import { Notifications } from './app/Restaurant/Notifications/page'

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
    element: <Register />,
  },
  {
    path: '/reservas',
    element: <Dashboard />,
  },
  {
    path: '/minhas-reservas',
    element: <Reservation />,
  },
  {
    path: '/notificacoes',
    element: <Notifications />,
  },
  {
    path: '/configuracoes',
    element: <RestaurantSettings />,
  },
])

export const Routes = () => {
  return <RouterProvider router={router} />
}
