import { FC } from 'react'
import Styled from './Comments.styles'
import useCommentList from '../../hooks/useCommentList/useCommentList'
import Comment from '../Comment/Comment'

const Comments: FC = () => {
  const { commentList, handleSaveComment, handleClickRemoveButton } = useCommentList()

  return (
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
  )
}

export default Comments
