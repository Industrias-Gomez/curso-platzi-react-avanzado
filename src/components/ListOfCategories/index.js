import React, { useEffect, useState } from 'react'
import { Category } from '../Category'
import { List, Item } from './styles'

function useCategoriesData () {
  const [categories, setCategories] = useState([])

  const [loading, setLoading] = useState(false)

  useEffect(function () {
    setLoading(true)
    window
      .fetch('https://petgram-server-two.vercel.app/categories')
      .then(res => res.json()) /* Converimos la respuesra Json */
      .then(response => {
        setCategories(response)
        setLoading(false)
      })
  }, [])

  return { categories, loading }
}

export const ListOfCategories = () => {
  const { categories, loading } = useCategoriesData()
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
    <List fixed={fixed}>
      {loading ? (
        <Item key='loading'>
          <Category />
        </Item>
      ) : (
        categories.map(category => (
          <Item key={category.id}>
            <Category {...category} path={`/pet/${category.id}`} />
          </Item>
        ))
      )}
    </List>
  )

  // if (loading) {
  //   return 'Cargando...'
  // }

  return (
    <>
      {renderList()}
      {showFixed && renderList(true)}
    </>
  )
}
