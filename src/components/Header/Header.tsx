import { FC } from 'react'
import Styled from './Header.styles'
import ButtonNormal from '../buttons/ButtonNormal/ButtonNormal'
import useLogin from '../../hooks/useLogin/useLogin'
import Login from '../../containers/Login/Login'
import { useAppSelector } from '../../app/hooks'
import { AccountSelectors } from '../../modules/Comments/store/reducers/Account.slice'
import uploadPng from './assets/images/logo.png'

const Header: FC = () => {
  const { closeLoginForm, cleanCurrentUser } = useLogin()

  const currentUser = useAppSelector(AccountSelectors.selectCurrentUser)
  const registrationForm = useAppSelector(AccountSelectors.selectRegistrationForm)

  const checkIfNeedToShowLogoutButton = (): boolean => {
    if (currentUser !== null) return true

    return false
  }

  return (
    <>
      {checkIfNeedToShowLogoutButton() ? (
        <Styled.Wrapper>
          <Styled.LogoutHeader>
            <Styled.Img
              src={uploadPng}
              alt=""
            />

            <Styled.CurrentUserWrapper>
              <Styled.UserName>
                <b>Hello: </b>
                {currentUser?.firstName}
              </Styled.UserName>

              <ButtonNormal
                preset="logout"
                onClick={cleanCurrentUser}
              >
                Logout
              </ButtonNormal>
            </Styled.CurrentUserWrapper>
          </Styled.LogoutHeader>
        </Styled.Wrapper>
      ) : null}

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
