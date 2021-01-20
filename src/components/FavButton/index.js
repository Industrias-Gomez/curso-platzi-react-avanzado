import React from 'react'
import { MdFavoriteBorder, MdFavorite } from 'react-icons/md'
import { Button } from './styles'

export const FavButton = ({ liked, likes, onClick }) => {
  const Icon = liked ? MdFavorite : MdFavoriteBorder // Validamos los cambios con una ternaria

  return (
    <Button onClick={onClick}>
      <Icon size='32px' />
      {likes} likes!
    </Button>
  )
}
