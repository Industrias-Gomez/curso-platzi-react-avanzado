import React, { useContext } from 'react'
import { Context } from '../Context'
import { UserForm } from '../components/UserForm'
import { RegisterMutation } from '../container/RegisterMutation'
import { LoginMutation } from '../container/LoginMutation'

export const NotRegisteredUser = () => {
  const { activateAuth } = useContext(Context)

  return (
    <>
      <RegisterMutation>
        {(register, { data, loading, error }) => {
          const onSubmit = ({ email, password }) => {
            const input = { email, password }
            const variables = { input }
            register({ variables }).then(({ data }) => {
              const { signup } = data
              activateAuth(signup)
            }) //Validamos el resultado de la promesa con el resultado validamos que se registro el usuario
          }

          const errorMsg = error && 'El usuario ya existe o hay algún problema.'

          return (
            <UserForm
              disabled={loading}
              error={errorMsg}
              title='Registrarse'
              onSubmit={onSubmit}
            />
          )
        }}
      </RegisterMutation>

      <LoginMutation>
        {(login, { data, loading, error }) => {
          const onSubmit = ({ email, password }) => {
            const input = { email, password }
            const variables = { input }
            login({ variables }).then(({ data }) => {
              const { login } = data
              activateAuth(login)
            }) //Validamos el resultado de la promesa con el resultado validamos que se registro el usuario
          }

          const errorMsg =
            error && 'La contraseña no es correcta o el usuario ya existe.'

          return (
            <UserForm
              disabled={loading}
              error={errorMsg}
              title='Iniciar sesión'
              onSubmit={onSubmit}
            />
          )
        }}
      </LoginMutation>
    </>
  )
}
