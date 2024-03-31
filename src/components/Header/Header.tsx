import { FC, useState } from 'react'
import Styled from './Header.styles'
import ButtonNormal from '../buttons/ButtonNormal/ButtonNormal'
import useLogin from '../../hooks/useLogin/useLogin'
import Login from '../../containers/Login/Login'
import { useAppSelector } from '../../app/hooks'
import { AccountSelectors } from '../../modules/Comments/store/reducers/Account.slice'
import uploadPng from './assets/images/logo.png'
import PostForm from '../PostForm/PostForm'
import usePostList from '../../hooks/usePostList copy/usePostList'

const Header: FC = () => {
  const { cleanCurrentUser } = useLogin()

  const { addPost } = usePostList()

  const currentUser = useAppSelector(AccountSelectors.selectCurrentUser)
  // const registrationForm = useAppSelector(AccountSelectors.selectRegistrationForm)

  const [isOpenPostForm, setIsOpenPostForm] = useState<boolean>(false)

  const checkIfNeedToShowLogout = (): boolean => {
    if (currentUser !== null) return true

    return false
  }

  const handleClickOpenPostForm = () => {
    setIsOpenPostForm(true)
  }

  const handleClickClosePostForm = () => {
    setIsOpenPostForm(false)
  }

  return (
    <>
      {checkIfNeedToShowLogout() ? (
        <Styled.Wrapper>
          <Styled.LogoutHeader>
            <Styled.Img
              src={uploadPng}
              alt=""
            />

            {!isOpenPostForm ? (
              <ButtonNormal
                preset="add"
                onClick={handleClickOpenPostForm}
              >
                Add Post
              </ButtonNormal>
            ) : (
              <Styled.ShadowBackground onClick={handleClickClosePostForm}>
                <Styled.LoginForm onClick={(e) => e.stopPropagation()}>
                  <Styled.ButtonCloseWrapper>
                    <ButtonNormal
                      preset="close"
                      onClick={handleClickClosePostForm}
                    >
                      Close
                    </ButtonNormal>
                  </Styled.ButtonCloseWrapper>

                  <PostForm addPost={addPost} />
                </Styled.LoginForm>
              </Styled.ShadowBackground>
            )}

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

      {/* {registrationForm ? (
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
      ) : null} */}
    </>
  )
}

export default Header
