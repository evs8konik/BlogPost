import React, { FC } from 'react'
import { useLoginContext } from '../../components/context/LoginContext/LoginContext'
import SignIn from './components/SignIn/SignIn'
import SignUp from './components/SignUp/SignUp'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { AccountActions, AccountSelectors, EAccountForm } from '../../modules/Comments/store/reducers/Account.slice'

const Login: FC = () => {
  const registrationForm = useAppSelector(AccountSelectors.selectRegistrationForm)

  switch (registrationForm) {
    case EAccountForm.SignUp:
      return <SignUp />

    case EAccountForm.SignIn:
      return <SignIn />

    default:
      return <SignIn />
  }
}

export default Login
