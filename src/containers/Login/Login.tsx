import React, { FC } from 'react'
import { useLoginContext } from '../../context/LoginContext/LoginContext'
import SignIn from './components/SignIn/SignIn'
import SignUp from './components/SignUp/SignUp'
import styles from './Login.module.css'

const Login: FC = () => {
  const { isShowSignIn, isShowSignUp } = useLoginContext()

  return (
    <>
      {isShowSignIn ? <SignIn /> : null}
      {isShowSignUp ? <SignUp /> : null}
    </>
  )
}
export default Login
