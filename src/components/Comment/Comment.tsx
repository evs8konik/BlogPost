import { FC, useEffect, useState } from 'react'
import ButtonRemove from '../buttons/ButtonRemove/ButtonRemove'
import styles from './Comment.module.css'
import NormalInput from '../inputs/NormalInput/NormalInput'
import { IComment, IReplyComment } from '../CommentForm/CommentForm'
import NormalTextArea from '../textAreas/NormalTextArea/NormalTextArea'
import ButtonSave from '../buttons/ButtonSave/ButtonSave'
import ButtonEdit from '../buttons/ButtonEdit/ButtonEdit'
import ReplyCommentForm from '../ReplyCommentForm/ReplyCommentForm'
import ReplyComment from '../ReplayComment/ReplayComment'
import ButtonReply from '../buttons/ButtonReply/ButtonReply'
import useReplyCommentList from '../../hooks/useReplyCommentList/useReplyCommentList'

interface IProps {
  id: string
  title: string
  content: string
  username: string
  onClick: (id: string) => void
  onSave: (data: IComment) => void
}

const Comment: FC<IProps> = ({ id, title, content, username, onClick, onSave }) => {
  const { replyCommentList, addReplyComment, handleSaveReplyComment, handleClickReplyRemoveButton } =
    useReplyCommentList()

  const [isEdit, setIsEdit] = useState(false)
  const [isReply, setIsReply] = useState(false)

  const [editableTitle, setEditableTitle] = useState('')
  const [editableContent, setEditableContent] = useState('')
  const [editableUsername, setEditableUsername] = useState('')
  const [editableReplyList, setEditableReplayList] = useState<IReplyComment[]>([])

  useEffect(() => {
    setEditableTitle(title)
  }, [title])

  useEffect(() => {
    setEditableContent(content)
  }, [content])

  useEffect(() => {
    setEditableUsername(username)
  }, [username])

  useEffect(() => {
    setEditableReplayList(replyCommentList)
  }, [replyCommentList])

  const toggleEditing = (): void => {
    setIsEdit(!isEdit)
  }

  const toggleReplay = (): void => {
    setIsReply(!isReply)
  }

  const handleSave = (): void => {
    onSave({
      id,
      title: editableTitle,
      content: editableContent,
      username: editableUsername,
      replyCommentList: editableReplyList,
    })
    isReply ? setIsReply(!isReply) : setIsReply(isReply)
    isEdit ? setIsEdit(!isEdit) : setIsEdit(isEdit)
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>
        {isEdit ? (
          <NormalInput
            label="Title"
            value={editableTitle}
            onChange={setEditableTitle}
          />
        ) : (
          <div className={'title'}>{title}</div>
        )}
      </div>

      <div className={styles.content}>
        {isEdit ? (
          <NormalTextArea
            label="Comment"
            value={editableContent}
            onChange={setEditableContent}
          />
        ) : (
          <div className={'content'}>{content}</div>
        )}
      </div>

      <div className={styles.username}>
        {isEdit ? (
          <NormalInput
            label="Username"
            value={editableUsername}
            onChange={setEditableUsername}
          />
        ) : (
          <div className={styles['username']}>{username}</div>
        )}
      </div>

      <div className={styles['button-wrapper']}>
        <div>
          {isEdit ? (
            <ButtonSave
              value="Save"
              onClick={handleSave}
            />
          ) : (
            <ButtonEdit
              value="Edit"
              onClick={toggleEditing}
            />
          )}
        </div>

        <div className={styles.button}>
          <ButtonRemove onClick={() => onClick(id)}>Delete</ButtonRemove>
        </div>

        {/* часть с ответом на коммент */}

        <div>
          {isReply ? (
            <ButtonSave
              value="Save"
              onClick={handleSave}
            />
          ) : (
            <ButtonReply
              value="Reply"
              onClick={toggleReplay}
            />
          )}
        </div>
      </div>

      <div>{isReply ? <ReplyCommentForm addReplyComment={addReplyComment} /> : undefined}</div>

      <div>
        <div className={styles['reply.comment']}>
          {replyCommentList.map((reply) => {
            return (
              <ReplyComment
                id={reply.id}
                content={reply.content}
                username={reply.username}
                onClick={handleClickReplyRemoveButton}
                onSave={handleSaveReplyComment}
              />
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default Comment
