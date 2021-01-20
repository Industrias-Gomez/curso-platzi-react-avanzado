import React, { useEffect, useRef, useState } from 'react'
import { Article, ImgWrapper, Img, Button } from './styles'
import { MdFavoriteBorder } from 'react-icons/md'

const DEFAULT_IMAGE =
  'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60'

export const PhotoCard = ({ id, likes = 0, src = DEFAULT_IMAGE }) => {
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

  return (
    <Article ref={element}>
      {show && (
        <>
          <a href={`/detail/${id}`}>
            <ImgWrapper>
              <Img src={src} alt='photo' />
            </ImgWrapper>
          </a>
          <Button>
            <MdFavoriteBorder size='32px' />
            {likes} likes!
          </Button>
        </>
      )}
    </Article>
  )
}
