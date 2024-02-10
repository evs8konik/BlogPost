import React, { FC, FormEvent, useState } from 'react'
import NormalInput from '../../../../components/inputs/NormalInput/NormalInput'
import useLogin from '../../../../hooks/useLogin/useLogin'
import { IUser, useLoginContext } from '../../../../components/context/LoginContext/LoginContext'
import Styled from './SygnUp.styles'
import ButtonNormal from '../../../../components/buttons/ButtonNormal/ButtonNormal'
import { useAppDispatch, useAppSelector } from '../../../../app/hooks'
import { AccountActions, AccountSelectors } from '../../../../modules/Comments/store/reducers/Account.slice'

const SignUp: FC = () => {
  // const currentUser = useAppSelector(AccountSelectors.selectCurrentUser)
  // const openedForm = useAppSelector(AccountSelectors.selectOpenForm)

  const dispatch = useAppDispatch()

  // const { setIsShowSignIn, setIsShowSignUp } = useLoginContext()

  const { addUser } = useLogin()

  const [firstName, setFirstName] = useState<string>('')
  const [lastName, setLastName] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  const handleSignInClick = () => {
    // setIsShowSignIn(true)
    // setIsShowSignUp(false)

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
