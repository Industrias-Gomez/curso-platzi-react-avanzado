import { useState } from 'react'

export function useLocalStorage (key, initialValue) {
  const [storedValue, setValue] = useState(() => {
    // Al estado le pasamos useState le pasamos una funcion
    try {
      const item = window.localStorage.getItem(key) // Utilizamos el localStorage del navegador para poder guardar los likes
      return item !== null ? JSON.parse(item) : initialValue // Lo parseamos para que NO retorne un string con el valor “false” sino un Boolean
    } catch (error) {
      return initialValue
    }
  })

  const setLocalStorage = value => {
    // Cambiamos el estado de setLocalStorage
    try {
      window.localStorage.setItem(key, JSON.stringify(value)) // Agregamos el key y agregamos el valor enviado desde el onClick (!liked)
      setValue(value) // Actualizamos el estado
    } catch (error) {
      console.error(error) // En caso de existir un error lo mostramos
    }
  }

  return [storedValue, setLocalStorage]
}