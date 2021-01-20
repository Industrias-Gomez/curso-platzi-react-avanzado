import { useEffect, useState, useRef } from 'react'

export function useNearScreen () {
  const element = useRef(null)
  const [show, setShow] = useState(false)

  useEffect(
    function () {
      Promise.resolve(
        typeof window.IntersectionObserver !== 'undefined'
          ? window.IntersectionObserver
          : import('intersection-observer')
      ).then(() => {
        // Por medio de esta funcion podemos indentificar si el elemento esta en el Viewport(En pantalla)
        const observer = new window.IntersectionObserver(function (entries) {
          const { isIntersecting } = entries[0]
          if (isIntersecting) {
            setShow(true)
            observer.disconnect() // Evitamos que el observador se vuelva a actualizar ya que solo queremos que se ejecute una vez
          }
        })
        // Mandamos llamar al metodo observer y le asignamos el elemento a observar
        observer.observe(element.current)
      })
    },
    [element]
  )
  return [show, element]
}
