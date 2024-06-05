import React, { FC } from 'react'
import SignIn from './components/SignIn/SignIn'
import SignUp from './components/SignUp/SignUp'
import { useAppSelector } from '../../app/hooks'
import { AccountSelectors, EAccountForm } from '../../modules/Comments/store/reducers/Account.slice'

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
