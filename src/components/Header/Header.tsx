import { FC, useState } from 'react'
import Styled from './Header.styles'
import ButtonNormal from '../buttons/ButtonNormal/ButtonNormal'
import useLogin from '../../hooks/useLogin/useLogin'
import Login from '../../containers/Login/Login'
import { useAppSelector } from '../../app/hooks'
import { AccountSelectors } from '../../modules/Comments/store/reducers/Account.slice'
import Select, { ISelectOption } from '../../modules/common/components/Select/Select'

const selectOptionsList: ISelectOption[] = [
  { label: 'Option 1', value: 'value1' },
  { label: 'Option 2', value: 'value2' },
  { label: 'Option 3', value: 'value3' },
  { label: 'Option 4', value: 'value4' },
]

const Header: FC = () => {
  const { closeLoginForm, cleanCurrentUser } = useLogin()

  const currentUser = useAppSelector(AccountSelectors.selectCurrentUser)
  const registrationForm = useAppSelector(AccountSelectors.selectRegistrationForm)

  const checkIfNeedToShowLogoutButton = (): boolean => {
    if (currentUser !== null) return true

    return false
  }

  const [selectedOption, setSelectedOption] = useState('Filter none')
  const handleSelect = (value: string) => {
    setSelectedOption(value)
  }

  return (
    <>
      {checkIfNeedToShowLogoutButton() ? (
        <Styled.LogoutHeader>
          <div>
            <b>Hello: </b>
            {currentUser?.firstName}
          </div>

          <Select
            optionList={selectOptionsList}
            selectedOption={selectedOption}
            onSelect={handleSelect}
          />

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
