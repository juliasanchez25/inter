import { useReadMe } from '@/hooks/use-read-me'
import { IUser } from '@/models/user'
import React, {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react'

const UserContext = createContext<{
  user?: Omit<IUser, 'password'>
  setUser: React.Dispatch<
    React.SetStateAction<Omit<IUser, 'password'> | undefined>
  >
  executeSetUser: (user: Omit<IUser, 'password'>, token: string) => void
  clearUser: () => void
  validateUser: () => void
}>({
  user: undefined,
  executeSetUser: () => {},
  clearUser: () => {},
  setUser: () => {},
  validateUser: () => {},
})

export const UserProvider = ({ children }: PropsWithChildren) => {
  const token = localStorage.getItem('token')

  const readMe = useReadMe({
    token,
  })

  const [user, setUser] = useState<Omit<IUser, 'password'> | undefined>()
  const notSecuredRoutes = ['/login', '/cadastro', '/']

  useEffect(() => {
    if (readMe.data) setUser(readMe.data)
  }, [readMe.data])

  function executeSetUser(user: Omit<IUser, 'password'>, token: string) {
    localStorage.setItem('token', token)
    setUser(user)
  }

  function clearUser() {
    setUser(undefined)
    localStorage.removeItem('token')
    window.location.href = '/'
  }

  function validateUser() {
    if (notSecuredRoutes.includes(window.location.pathname)) return
    if (!token) {
      clearUser()
      return
    }
    readMe.refetch()
  }

  return (
    <UserContext.Provider
      value={{ user, setUser, executeSetUser, clearUser, validateUser }}
    >
      {children}
    </UserContext.Provider>
  )
}

export const useUser = () => {
  return useContext(UserContext)
}
