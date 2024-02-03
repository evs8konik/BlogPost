import { FC, useEffect, useState } from 'react'
// import styles from './Comment.module.css'
import NormalInput from '../inputs/NormalInput/NormalInput'
import { IComment, IReplyComment } from '../CommentForm/CommentForm'
import NormalTextArea from '../textAreas/NormalTextArea/NormalTextArea'
import ReplyCommentForm from '../ReplyCommentForm/ReplyCommentForm'
import ReplyComment from '../ReplyComment/ReplyComment'
import Styled from './Comment.styles'
import { useLoginContext } from '../../context/LoginContext/LoginContext'
import ButtonNormal from '../buttons/ButtonNormal/ButtonNormal'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { CommentsActions } from '../../modules/Comments/store/redusers/Comments.slice'
import useCommentList from '../../hooks/useCommentList/useCommentList'

type TProps = { onClick: (id: string) => void; onSave: (data: IComment) => void } & IComment

const Comment: FC<TProps> = ({ id, title, content, owner, replyCommentList, onClick, onSave }) => {
  const dispatch = useAppDispatch()

  const { commentList, saveCommentList } = useCommentList()

  const { currentUser } = useLoginContext()

  const [isEdit, setIsEdit] = useState(false)
  const [isReply, setIsReply] = useState(false)

  const [editableTitle, setEditableTitle] = useState(title)
  const [editableContent, setEditableContent] = useState(content)
  // const [replyList, setReplayList] = useState<IReplyComment[]>([])

  useEffect(() => {
    setEditableTitle(title)
  }, [title])

  useEffect(() => {
    setEditableContent(content)
  }, [content])

  const toggleEditing = (): void => {
    setIsEdit(!isEdit)
  }

  const toggleReplay = (): void => {
    setIsReply(!isReply)
  }

  const handleSave = (): void => {
    console.log('TEST_DATA', replyCommentList)

    onSave({
      id,
      title: editableTitle,
      content: editableContent,
      owner,
      replyCommentList,
    })

    isReply ? setIsReply(!isReply) : setIsReply(isReply)
    isEdit ? setIsEdit(!isEdit) : setIsEdit(isEdit)
  }

  const addReply = (reply: IReplyComment): void => {
    dispatch(CommentsActions.addReplyComment({ commentId: id, reply }))

    saveCommentList(
      commentList.map((comment) => {
        if (comment.id !== id) return comment

        return { ...comment, replyCommentList: [...comment.replyCommentList, reply] }
      }),
    )
    // const newCommentList = [...replyList, reply]

    // setEditableReplayList((prevReplyList) => [...prevReplyList, reply])
    // setReplayList(newCommentList)
    // handleSave()
  }

  const handleSaveReplyEditComment = (replyComment: IReplyComment): void => {
    dispatch(CommentsActions.saveReplyComment({ commentId: id, replyComment, replyCommentId: replyComment.id }))

    saveCommentList(
      commentList.map((comment) => {
        if (comment.id !== id) return comment

        return {
          ...comment,
          replyCommentList: comment.replyCommentList.map((reply) => {
            if (reply.id === replyComment.id) {
              return {
                ...reply,
                ...replyComment,
              }
            }
            return reply
          }),
        }
      }),
    )

    // dispatch(CommentsActions.saveReplyComment(data))
    // const newReplyCommentList = replyCommentList.map((reply) => {
    //   if (reply.id === data.id) {
    //     return { ...reply, ...data }
    //   }
    //   return reply
    // })
    // // setReplayList(newReplyCommentList)
    // handleSave()
    // // saveReplyCommentList(replyId, newReplyCommentList)
  }

  const handleClickReplyRemoveButton = (replyCommentId: string): void => {
    dispatch(CommentsActions.deleteReplyComment({ commentId: id, replyCommentId }))

    saveCommentList(
      commentList.map((comment) => {
        if (comment.id !== id) return comment

        return {
          ...comment,
          replyCommentList: [...comment.replyCommentList.filter((reply) => reply.id !== replyCommentId)],
        }
      }),
    )
    // const newReplyCommentList = replyCommentList.filter((reply) => reply.id !== replyCommentId)
    // setReplayList(newReplyCommentList)
    // handleSave()
    // // saveReplyCommentList(replyId, newReplyCommentList)
  }

  const checkIfNeedToShowEditDeletButton = () => {
    return owner.email === currentUser?.email
  }

  const checkIfNeedToShowReplyButton = () => {
    return currentUser !== null
  }

  return (
    <Styled.Div
      $preset={'wrapper'}
      $color="red"
    >
      <Styled.Div $preset={'title'}>
        {isEdit ? (
          <NormalInput
            label="title"
            value={editableTitle}
            onChange={setEditableTitle}
          />
        ) : (
          <div className={'title'}>{title}</div>
        )}
      </Styled.Div>

      <Styled.Div $preset={'content'}>
        {isEdit ? (
          <NormalTextArea
            label="Comment"
            value={editableContent}
            onChange={setEditableContent}
          />
        ) : (
          <div className={'content'}>{content}</div>
        )}
      </Styled.Div>

      <Styled.Div $preset={'username'}>{owner.firstName}</Styled.Div>

      <Styled.Div $preset={'buttonWrapper'}>
        {checkIfNeedToShowEditDeletButton() ? (
          <>
            {isEdit ? (
              <ButtonNormal
                preset="save"
                onClick={handleSave}
              >
                Save
              </ButtonNormal>
            ) : (
              <ButtonNormal
                preset="edit"
                onClick={toggleEditing}
              >
                Edit
              </ButtonNormal>
            )}

            <ButtonNormal
              preset="delete"
              onClick={() => onClick(id)}
            >
              Delete
            </ButtonNormal>
          </>
        ) : null}

        {/* Часть с ответом на комментарий */}

        {checkIfNeedToShowReplyButton() ? (
          <>
            {isReply ? (
              <ButtonNormal
                preset="save"
                // onClick={handleSave}
              >
                Save
              </ButtonNormal>
            ) : (
              <ButtonNormal
                preset="reply"
                onClick={toggleReplay}
              >
                Reply
              </ButtonNormal>
            )}
          </>
        ) : null}
      </Styled.Div>

      {isReply ? <ReplyCommentForm addReplyComment={addReply} /> : null}

      {replyCommentList.map((reply) => {
        return (
          <ReplyComment
            key={reply.id}
            commentOwner={owner}
            onClick={handleClickReplyRemoveButton}
            onSave={handleSaveReplyEditComment}
            {...reply}
          />
        )
      })}
    </Styled.Div>
  )
}

export default Comment
