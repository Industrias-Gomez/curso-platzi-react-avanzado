import React, { createContext, useState } from 'react'

export const Context = createContext()

const Provider = ({ children }) => {
  const [isAuth, setIsAuth] = useState(() => {
    return window.sessionStorage.getItem('token')
  })

  const value = {
    isAuth,
    activateAuth: token => { // Metodo para iniciar sesion y guadarla en el storage
      setIsAuth(true)
      window.sessionStorage.setItem('token', token)
    },
    removeAuth: () => { // Metodo para cerarar sesion y eliminarla del storage
      setIsAuth(false)
      window.sessionStorage.removeItem('token')
    }
  }

  return <Context.Provider value={value}>{children}</Context.Provider>
}

export default {
  Provider,
  Consumer: Context.Consumer
}
