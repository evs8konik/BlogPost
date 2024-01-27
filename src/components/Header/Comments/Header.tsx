import { FC } from 'react'
import { ShadowBackground, LoginForm, ButtonCloseWrapper, LoginHeader, LogoutHeader } from './Header.styles'
import LoginContext from '../../../context/LoginContext/LoginContext'
import ButtonNormal from '../../buttons/ButtonNormal/ButtonNormal'
import useLogin from '../../../hooks/useLogin/useLogin'
import Login from '../../../containers/Login/Login'

type TProps = {}

const Header: FC<TProps> = ({}) => {
  const {
    user,
    currentUser,
    setCurrentUser,
    setUser,
    isShowSignIn,
    isShowSignUp,
    isShowLoginForm,
    setIsShowSignIn,
    setIsShowSignUp,
    setIsShowLoginForm,
    closeLoginForm,
    cleanCurrentUser,
  } = useLogin()

  const handleLoginClick = () => {
    setIsShowSignIn(true)
    setIsShowSignUp(false)
    setIsShowLoginForm(true)
  }

  const checkIfNeedToShowLogin = (): boolean => {
    if (!isShowSignIn && !isShowSignUp && !isShowLoginForm && currentUser === null) return true

    return false
  }

  const checkIfNeedToShowLogoutButton = (): boolean => {
    if (currentUser !== null) return true

    return false
  }

  return (
    <LoginContext.Provider
      value={{
        user,
        currentUser,
        isShowSignIn,
        isShowSignUp,
        isShowLoginForm,
        setUser,
        setCurrentUser,
        setIsShowSignIn,
        setIsShowSignUp,
        setIsShowLoginForm,
      }}
    >
      <>
        <div>
          {checkIfNeedToShowLogin() ? (
            <LoginHeader>
              <ButtonNormal
                preset="login"
                onClick={handleLoginClick}
              >
                Login
              </ButtonNormal>
            </LoginHeader>
          ) : null}

          {checkIfNeedToShowLogoutButton() ? (
            <LogoutHeader>
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
            </LogoutHeader>
          ) : null}
        </div>
        {isShowLoginForm && (
          <ShadowBackground onClick={closeLoginForm}>
            <LoginForm onClick={(e) => e.stopPropagation()}>
              <ButtonCloseWrapper>
                <ButtonNormal
                  preset="close"
                  onClick={closeLoginForm}
                >
                  Close
                </ButtonNormal>
              </ButtonCloseWrapper>

              <Login />
            </LoginForm>
          </ShadowBackground>
        )}
      </>
    </LoginContext.Provider>
  )
}

export default Header
