import { FC } from 'react'
import Styled from './LoginPage.styles'

import ButtonNormal from '../buttons/ButtonNormal/ButtonNormal'
import useLogin from '../../hooks/useLogin/useLogin'
import Login from '../../containers/Login/Login'
import useCommentList from '../../hooks/useCommentList/useCommentList'
import CommentForm from '../CommentForm/CommentForm'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { AccountActions, AccountSelectors } from '../../modules/Comments/store/reducers/Account.slice'

type TProps = {}

const LoginPage: FC<TProps> = ({}) => {
  const dispatch = useAppDispatch()

  const { closeLoginForm, cleanCurrentUser } = useLogin()

  const currentUser = useAppSelector(AccountSelectors.selectCurrentUser)
  const registrationForm = useAppSelector(AccountSelectors.selectRegistrationForm)

  // const showSingIn = dispatch(AccountActions.showSignInForm())

  const handleLoginClick = () => {
    dispatch(AccountActions.showSignInForm())
  }

  const checkIfNeedToShowLogin = (): boolean => {
    if (!currentUser && !registrationForm) return true

    return false
  }

  const checkIfNeedToShowLogoutButton = (): boolean => {
    if (currentUser !== null) return true

    return false
  }

  return <Login />
}

export default LoginPage
