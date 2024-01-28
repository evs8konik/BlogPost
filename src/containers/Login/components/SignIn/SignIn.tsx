import React, { FC, FormEvent, useState } from 'react'
import NormalInput from '../../../../components/inputs/NormalInput/NormalInput'
import useLogin from '../../../../hooks/useLogin/useLogin'
import LoginContext, { IUser, useLoginContext } from '../../../../context/LoginContext/LoginContext'
import { Form } from './SygnIn.styles'
import ButtonNormal from '../../../../components/buttons/ButtonNormal/ButtonNormal'

const SignIn: FC = () => {
  const { setIsShowSignIn, setIsShowSignUp, setUser, setCurrentUser, setIsShowLoginForm } = useLoginContext()
  const { getUser, addCurrentUser } = useLogin()

  const [editableUsername, setEditableUsername] = useState<string>('')
  const [editablePassword, setEditablePassword] = useState<string>('')

  const handleSubmit = (e: FormEvent): void => {
    e.preventDefault()
    const ourUser: IUser | null = getUser(editableUsername, editablePassword)

    setCurrentUser(ourUser)
    addCurrentUser(ourUser)

    setIsShowSignIn(false)
    setIsShowSignUp(false)
    setIsShowLoginForm(false)
  }

  const handleSignUpClick = () => {
    setIsShowSignIn(false)
    setIsShowSignUp(true)
  }

  return (
    <Form onSubmit={handleSubmit}>
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
    </Form>
  )
}

export default SignIn
