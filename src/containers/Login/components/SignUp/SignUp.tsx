import React, { FC, FormEvent, useState } from 'react'

import useLogin from '../../../../hooks/useLogin/useLogin'
import Styled from './SignUp.styles'
import ButtonNormal from '../../../../components/buttons/ButtonNormal/ButtonNormal'
import { useAppDispatch } from '../../../../app/hooks'
import { AccountActions } from '../../../../modules/Comments/store/reducers/Account.slice'
import { IUser } from '../../../../components/CommentForm/CommentForm'
import useNotification from '../../../../hooks/useNotification/useNotification'

import { ENotificationType } from '../../../../modules/Comments/store/reducers/Notification.slice'

import { v4 } from 'uuid'
import useLoginValidator from '../../../../hooks/useLogin/hooks/useLoginValidator/useLoginValidator'
import NormalInput from '../../../../components/inputs/NormalInput/NormalInput'
import { useNavigate } from 'react-router-dom'
import { EAppRoute } from '../../../../routes/AppRoute'

const SignUp: FC = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const { addUser, getUser } = useLogin()
  const { addNotification } = useNotification()
  const { checkIfNeedToRegisterThisUser } = useLoginValidator()

  const [firstName, setFirstName] = useState<string>('')
  const [lastName, setLastName] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  const handleSignInClick = () => {
    dispatch(AccountActions.showSignInForm())
  }

  const handleClickToHomePage = () => {
    navigate(EAppRoute.Posts)
  }

  const ourUser: IUser | null = getUser(email, password)

  const handleSubmit = (e: FormEvent): void => {
    e.preventDefault()
    const newUser: IUser = {
      firstName,
      lastName,
      email,
      password,
    }

    checkIfNeedToRegisterThisUser(ourUser, newUser, email)
  }

  return (
    <Styled.Form onSubmit={handleSubmit}>
      <NormalInput
        label="First name"
        value={firstName}
        type={'text'}
        onChange={setFirstName}
      />

      <NormalInput
        label="Last name"
        value={lastName}
        type={'text'}
        onChange={setLastName}
      />

      <NormalInput
        label="Email"
        value={email}
        type={'email'}
        onChange={setEmail}
      />

      <NormalInput
        label="Password"
        value={password}
        type={'text'}
        onChange={setPassword}
      />

      <ButtonNormal preset="singUp">Sing Up</ButtonNormal>

      <ButtonNormal
        preset="singIn"
        onClick={handleSignInClick}
      >
        Sing In
      </ButtonNormal>

      <Styled.backToHomePage onClick={handleClickToHomePage}>Back to home page...</Styled.backToHomePage>
    </Styled.Form>
  )
}

export default SignUp
