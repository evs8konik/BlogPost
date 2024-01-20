import React, { FC, FormEvent, useState } from 'react'
import NormalInput from '../../../../components/inputs/NormalInput/NormalInput'
import useLogin from '../../../../hooks/useLogin/useLogin'
import LoginContext, { IUser, useLoginContext } from '../../../../context/LoginContext/LoginContext'
import styles from './SIgnIn.module.css'

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
    <form
      className={styles['wrapper']}
      onSubmit={handleSubmit}
    >
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

      <button
        className={styles['singIn-button']}
        type="submit"
      >
        Sing In
      </button>

      <button
        className={styles['singUp-button']}
        onClick={handleSignUpClick}
      >
        Create Account
      </button>
    </form>
  )
}

export default SignIn
