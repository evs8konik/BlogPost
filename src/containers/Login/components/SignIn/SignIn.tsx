import React, { FC, FormEvent, useState } from 'react'
import NormalInput from '../../../../components/inputs/NormalInput/NormalInput'
import useLogin from '../../../../hooks/useLogin/useLogin'
import { IUser, useLoginContext } from '../../../../context/LoginContext/LoginContext'
import Styled from './SygnIn.styles'
import ButtonNormal from '../../../../components/buttons/ButtonNormal/ButtonNormal'
import { AccountActions } from '../../../../modules/Comments/store/reducers/Account.slice'
import { useAppDispatch } from '../../../../app/hooks'

const SignIn: FC = () => {
  const dispatch = useAppDispatch()

  // const { setIsShowSignIn, setIsShowSignUp, setIsShowLoginForm } = useLoginContext()

  const { getUser, addCurrentUser } = useLogin()

  const [editableUsername, setEditableUsername] = useState<string>('')
  const [editablePassword, setEditablePassword] = useState<string>('')

  const handleSubmit = (e: FormEvent): void => {
    e.preventDefault()
    const ourUser: IUser | null = getUser(editableUsername, editablePassword)

    // setCurrentUser(ourUser)
    addCurrentUser(ourUser)
    dispatch(AccountActions.closeLoginForm())
    // setIsShowSignIn(false)
    // setIsShowSignUp(false)
    // setIsShowLoginForm(false)
  }

  const handleSignUpClick = () => {
    // setIsShowSignIn(false)
    // setIsShowSignUp(true)
    dispatch(AccountActions.showSignUpForm())
  }

  return (
    <Styled.Form onSubmit={handleSubmit}>
      <NormalInput
        label="Username"
        value={editableUsername}
        onChange={setEditableUsername}
      />

      <NormalInput
        label="Password"
        value={editablePassword}
        onChange={setEditablePassword}
      />

      <ButtonNormal preset="singIn">Sing In</ButtonNormal>

      <ButtonNormal
        preset="singUp"
        onClick={handleSignUpClick}
      >
        Create Account
      </ButtonNormal>
    </Styled.Form>
  )
}

export default SignIn
