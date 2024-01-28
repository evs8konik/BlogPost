import { FC } from 'react'

import { Wrapper, Title, CommentWrapper } from './Comments.styles'

import useLogin from '../../hooks/useLogin/useLogin'
import useCommentList from '../../hooks/useCommentList/useCommentList'
import Comment from '../Comment/Comment'
import CommentForm from '../CommentForm/CommentForm'
import LoginContext from '../../context/LoginContext/LoginContext'

type TProps = {}

const Comments: FC<TProps> = ({}) => {
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

  const checkIfNeedToShowCommentForm = (): boolean => {
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
        <Wrapper>
          <div>{checkIfNeedToShowCommentForm() ? <CommentForm addComment={addComment} /> : null}</div>
          <Title>COMMENTS</Title>

          <CommentWrapper>
            {commentList.map((comment) => (
              <Comment
                key={comment.id}
                onClick={handleClickRemoveButton}
                onSave={handleSaveComment}
                {...comment}
              />
            ))}
          </CommentWrapper>
        </Wrapper>
      </>
    </LoginContext.Provider>
  )
}

export default Comments
