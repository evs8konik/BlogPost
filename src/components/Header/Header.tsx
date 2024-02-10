import { FC } from 'react'
import Styled from './Header.styles'
import LoginContext from '../context/LoginContext/LoginContext'
import ButtonNormal from '../buttons/ButtonNormal/ButtonNormal'
import useLogin from '../../hooks/useLogin/useLogin'
import Login from '../../containers/Login/Login'
import useCommentList from '../../hooks/useCommentList/useCommentList'
import CommentForm from '../CommentForm/CommentForm'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { AccountActions, AccountSelectors } from '../../modules/Comments/store/reducers/Account.slice'

type TProps = {}

const Header: FC<TProps> = ({}) => {
  const { addComment } = useCommentList()

  const dispatch = useAppDispatch()

  const { closeLoginForm, cleanCurrentUser } = useLogin()

  const currentUser = useAppSelector(AccountSelectors.selectCurrentUser)
  const registrationForm = useAppSelector(AccountSelectors.selectRegistrationForm)

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

  const checkIfNeedToShowCommentForm = (): boolean => {
    if (currentUser !== null) return true

    return false
  }

  return (
    <>
      {/* {checkIfNeedToShowLogin() ? (
        <Styled.LoginHeader>
          <ButtonNormal
            preset="login"
            onClick={handleLoginClick}
          >
            Login
          </ButtonNormal>
        </Styled.LoginHeader>
      ) : null} */}

      {checkIfNeedToShowLogoutButton() ? (
        <Styled.LogoutHeader>
          <div>
            <b>Hello: </b>
            {currentUser?.firstName}
          </div>

          <ButtonNormal
            preset="logout"
            onClick={cleanCurrentUser}
          >
            Logout
          </ButtonNormal>
        </Styled.LogoutHeader>
      ) : null}

      {checkIfNeedToShowCommentForm() ? <CommentForm addComment={addComment} /> : null}

      {registrationForm ? (
        <Styled.ShadowBackground onClick={closeLoginForm}>
          <Styled.LoginForm onClick={(e) => e.stopPropagation()}>
            <Styled.ButtonCloseWrapper>
              <ButtonNormal
                preset="close"
                onClick={closeLoginForm}
              >
                Close
              </ButtonNormal>
            </Styled.ButtonCloseWrapper>

            <Login />
          </Styled.LoginForm>
        </Styled.ShadowBackground>
      ) : null}
    </>
  )
}

export default Header
