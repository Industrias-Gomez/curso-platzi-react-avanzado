import React from 'react'
import { ListOfCategories } from './components/ListOfCategories'
import { GlobalStyles } from './styles/GlobalStyles'
import { ListOfPhotoCards } from './container/ListOfPhotoCards'
import { Logo } from './components/Logo'

export const App = () => (
  <>
    <GlobalStyles />
    <Logo />
    <ListOfCategories />
    <ListOfPhotoCards categoryId={1} />
  </>
)
