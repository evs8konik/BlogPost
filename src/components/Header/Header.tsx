import { FC } from 'react'
import Styled from './Header.styles'
import ButtonNormal from '../buttons/ButtonNormal/ButtonNormal'
import useLogin from '../../hooks/useLogin/useLogin'
import Login from '../../containers/Login/Login'
import { useAppSelector } from '../../app/hooks'
import { AccountSelectors } from '../../modules/Comments/store/reducers/Account.slice'
// import Select, { ISelectOption } from '../../modules/common/components/Select/Select'

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
