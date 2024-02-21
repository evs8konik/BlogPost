import React, { FC, FormEvent, useState } from 'react'
import NormalInput from '../../../../components/inputs/NormalInput/NormalInput'
import useLogin from '../../../../hooks/useLogin/useLogin'
import Styled from './SignUp.styles'
import ButtonNormal from '../../../../components/buttons/ButtonNormal/ButtonNormal'
import { useAppDispatch } from '../../../../app/hooks'
import { AccountActions } from '../../../../modules/Comments/store/reducers/Account.slice'
import { IUser } from '../../../../components/CommentForm/CommentForm'
import useNotification from '../../../../hooks/useNotification/useNotification'

import { ENotificationType } from '../../../../modules/Comments/store/reducers/Notification.slice'

import { v4 } from 'uuid'

const SignUp: FC = () => {
  const dispatch = useAppDispatch()

  const { addUser } = useLogin()

  const { addNotification } = useNotification()

  const [firstName, setFirstName] = useState<string>('')
  const [lastName, setLastName] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  const handleSignInClick = () => {
    dispatch(AccountActions.showSignInForm())
  }

  const handleSubmit = (e: FormEvent): void => {
    e.preventDefault()
    const newUser: IUser = {
      firstName,
      lastName,
      email,
      password,
    }
    addUser(newUser)

    addNotification({ id: v4(), type: ENotificationType.Error, title: '1' })
  }

  return (
    <Styled.Form onSubmit={handleSubmit}>
      <NormalInput
        label="First name"
        value={firstName}
        onChange={setFirstName}
      />

      <NormalInput
        label="Last name"
        value={lastName}
        onChange={setLastName}
      />

      <NormalInput
        label="Email"
        value={email}
        onChange={setEmail}
      />

      <NormalInput
        label="Password"
        value={password}
        onChange={setPassword}
      />

      <ButtonNormal preset="singUp">Sing Up</ButtonNormal>

      <ButtonNormal
        preset="singIn"
        onClick={handleSignInClick}
      >
        Sing In
      </ButtonNormal>
    </Styled.Form>
  )
}

export default SignUp
