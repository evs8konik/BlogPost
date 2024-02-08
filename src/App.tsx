import React, { FC } from 'react'
import useCommentList from './hooks/useCommentList/useCommentList'
import LoginContext, { IUser } from './context/LoginContext/LoginContext'
import useLogin from './hooks/useLogin/useLogin'
import Comments from './components/Comments/Comments'
import Header from './components/Header/Header'

const App: FC = () => {
  const { commentList, addComment, handleSaveComment, handleClickRemoveButton } = useCommentList()
  const {
    // user,
    currentUser,
    isShowSignIn,
    isShowSignUp,

    // setIsShowSignIn,
    // setIsShowSignUp,
    // setIsShowLoginForm,
    closeLoginForm,
    cleanCurrentUser,
  } = useLogin()

  // const handleLoginClick = () => {
  //   setIsShowSignIn(true)
  //   setIsShowSignUp(false)
  //   setIsShowLoginForm(true)
  // }

  // const checkIfNeedToShowLogin = (): boolean => {
  //   if (!isShowSignIn && !isShowSignUp && !isShowLoginForm && currentUser === null) return true

  //   return false
  // }

  // const checkIfNeedToShowLogoutButton = (): boolean => {
  //   if (currentUser !== null) return true

  //   return false
  // }

  // const checkIfNeedToShowCommentForm = (): boolean => {
  //   if (currentUser !== null) return true

  //   return false
  // }

  return (
    <>
      <div className="general-wrapper">
        <Header />

        <Comments />
      </div>
    </>
  )
}

export default App
