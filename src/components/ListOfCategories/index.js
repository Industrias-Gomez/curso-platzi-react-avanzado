import React, { useEffect, useState } from 'react'
import { Category } from '../Category'
import { List, Item } from './styles'

export const ListOfCategories = () => {
  const [categories, setCategories] = useState([])

  useEffect(function () {
    window
      .fetch('https://petgram-server-two.vercel.app/categories')
      .then(res => res.json()) /* Converimos la respuesra Json */
      .then(response => {
        setCategories(response)
      })
  }, [])

  const [showFixed, setShowFixed] = useState(false)

  useEffect(
    function () {
      const onScroll = e => {
        const newShowFixed = window.scrollY > 190
        showFixed !== newShowFixed && setShowFixed(newShowFixed)
      }

      document.addEventListener(
        'scroll',
        onScroll
      ) /* Escuchamos el evento scroll y ejecutamos el metodo onScroll */

      return () =>
        document.removeEventListener(
          'scroll',
          onScroll
        ) /* Limpiamos el efecto cada vez que se vuelva a ejecutar */
    },
    [showFixed]
  )

  const renderList = fixed => (
    <List className={fixed ? 'fixed' : ''}>
      {categories.map(category => (
        <Item key={category.id}>
          <Category {...category} />
        </Item>
      ))}
    </List>
  )

  return (
    <>
      {renderList()}
      {showFixed && renderList(true)}
    </>
  )
}
