import { FC } from 'react'
import Styled from './Comments.styles'
import useLogin from '../../hooks/useLogin/useLogin'
import useCommentList from '../../hooks/useCommentList/useCommentList'
import Comment from '../Comment/Comment'
import LoginContext from '../../context/LoginContext/LoginContext'

const Comments: FC = () => {
  const { commentList, handleSaveComment, handleClickRemoveButton } = useCommentList()

  // const {
  //   currentUser,
  //   isShowSignIn,
  //   isShowSignUp,
  //   isShowLoginForm,
  //   // setIsShowSignIn,
  //   // setIsShowSignUp,
  //   // setIsShowLoginForm,
  // } = useLogin()

  return (
    // <LoginContext.Provider
    //   value={{
    //     currentUser,
    //     isShowSignIn,
    //     isShowSignUp,
    //     isShowLoginForm,
    //     // setIsShowSignIn,
    //     // setIsShowSignUp,
    //     // setIsShowLoginForm,
    //   }}
    // >
    <>
      <Styled.Wrapper>
        <Styled.Title>COMMENTS</Styled.Title>

        <Styled.CommentWrapper>
          {commentList.map((comment) => (
            <Comment
              key={comment.id}
              onClick={handleClickRemoveButton}
              onSave={handleSaveComment}
              {...comment}
            />
          ))}
        </Styled.CommentWrapper>
      </Styled.Wrapper>
    </>
    // </LoginContext.Provider>
  )
}

export default Comments
