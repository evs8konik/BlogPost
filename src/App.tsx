import React, { FC, useState } from 'react'
import Comment from './components/Comment/Comment'
import CommentForm, { IComment } from './components/CommentForm/CommentForm'
import useCommentList from './hooks/useCommentList/useCommentList'
import LoginContext, { IUser } from './context/LoginContext/LoginContext'
import Login from './containers/Login/Login'
import useLogin from './hooks/useLogin/useLogin'
import ButtonClose from './components/buttons/ButtonClose/ButtonClose'

const App: FC = () => {
  const { commentList, addComment, handleSaveComment, handleClickRemoveButton } = useCommentList()
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
        <div className="general-wrapper">
          <div>
            {checkIfNeedToShowLogin() ? (
              <div className="login-header">
                <button
                  className="login-button"
                  onClick={handleLoginClick}
                >
                  Login
                </button>
              </div>
            ) : null}

            {checkIfNeedToShowLogoutButton() ? (
              <div className="logout-header">
                <div>
                  <b>Hello: </b>
                  {currentUser?.firstName}
                </div>
                <button
                  className="logout-button"
                  onClick={cleanCurrentUser}
                >
                  Logout
                </button>{' '}
              </div>
            ) : null}
          </div>

          {isShowLoginForm && (
            <div
              className="shadow-background"
              onClick={closeLoginForm}
            >
              <div
                className="login-form"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="button-close_wrapper">
                  <ButtonClose
                    value="Close"
                    onClick={closeLoginForm}
                  />
                </div>

                <Login />
              </div>
            </div>
          )}

          <div className="main">
            <div>
              <CommentForm addComment={addComment} />
            </div>

            <div className={'comment-title'}>
              <div>COMMENTS</div>
            </div>

            <div className="comments">
              {commentList.map((comment) => (
                <Comment
                  key={comment.id}
                  id={comment.id}
                  title={comment.title}
                  content={comment.content}
                  username={comment.username}
                  onClick={handleClickRemoveButton}
                  onSave={handleSaveComment}
                />
              ))}
            </div>
          </div>
        </div>
      </>
    </LoginContext.Provider>
  )
}

export default App
