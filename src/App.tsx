import { FC } from 'react'
import Comment from './components/Comment/Comment'
import CommentForm, { IComment } from './components/CommentForm/CommentForm'
import useCommentList from './hooks/useCommentList/useCommentList'

const App: FC = () => {
  const { commentList, addComment, handleSaveComment, handleClickRemoveButton } = useCommentList()

  return (
    <>
      <div className="main">
        <div>
          <CommentForm addComment={addComment} />
        </div>

        <div className={'comment-title'}>
          <div>COMMENTS</div>
        </div>

        <div className="comments">
          {commentList.map((comment) => {
            return (
              <Comment
                key={comment.id}
                id={comment.id}
                title={comment.title}
                content={comment.content}
                username={comment.username}
                onClick={handleClickRemoveButton}
                onSave={handleSaveComment}
              />
            )
          })}
        </div>
      </div>
    </>
  )
}

export default App
