import React, { FC, FormEvent, useState } from 'react'
import NormalInput from '../../../../components/inputs/NormalInput/NormalInput'
import useLogin from '../../../../hooks/useLogin/useLogin'
import { IUser, useLoginContext } from '../../../../context/LoginContext/LoginContext'
import styles from './SIgnUp.module.css'

const SignUp: FC = () => {
  const { setIsShowSignIn, setIsShowSignUp } = useLoginContext()

  const { addUser } = useLogin()

  const [firstName, setFirstName] = useState<string>('')
  const [lastName, setLastName] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  const handleSignInClick = () => {
    setIsShowSignIn(true)
    setIsShowSignUp(false)
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
    <form
      className={styles['wrapper']}
      onSubmit={handleSubmit}
    >
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
      <button
        className={styles['singUp-button']}
        type="submit"
      >
        Sing Up
      </button>

      <button
        className={styles['singIn-button']}
        onClick={handleSignInClick}
      >
        Sing In
      </button>
    </form>
  )
}

export default SignUp
