import React from 'react'
import Context from '../Context'
import { UserForm } from '../components/UserForm'
import { RegisterMutation } from '../container/RegisterMutation'

export const NotRegisteredUser = () => (
  <Context.Consumer>
    {({ activateAuth }) => {
      return (
        <>
          <RegisterMutation>
            {register => {
              const onSubmit = ({ email, password }) => {
                const input = { email, password }
                const variables = { input }
                register({ variables }).then(activateAuth) //Validamos el resultado de la promesa con el resultado validamos que se registro el usuario
              }
              return <UserForm title='Registrarse' onSubmit={onSubmit} />
            }}
          </RegisterMutation>
          <UserForm title='Iniciar sesión' onSubmit={activateAuth} />
        </>
      )
    }}
  </Context.Consumer>
)
