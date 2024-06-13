import { useEffect } from 'react'
import { Routes } from './Routes'
import { useUser } from './context/user-context'

function App() {
  const { validateUser } = useUser()
  useEffect(() => {
    validateUser()
  }, [validateUser])

  return <Routes />
}

export default App
