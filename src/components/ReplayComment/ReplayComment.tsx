import { FC, useEffect, useState } from 'react'
import ButtonRemove from '../buttons/ButtonRemove/ButtonRemove'
import styles from './ReplayComment.module.css'
import NormalInput from '../inputs/NormalInput/NormalInput'
import { IReplyComment } from '../CommentForm/CommentForm'
import NormalTextArea from '../textAreas/NormalTextArea/NormalTextArea'
import ButtonSave from '../buttons/ButtonSave/ButtonSave'
import ButtonEdit from '../buttons/ButtonEdit/ButtonEdit'

interface IProps {
  id: string
  content: string
  username: string
  onClick: (id: string) => void
  onSave: (data: IReplyComment) => void
}

const ReplyComment: FC<IProps> = ({ id, content, username, onClick, onSave }) => {
  const [isEdit, setIsEdit] = useState(false)

  const [editableContent, setEditableContent] = useState('')
  const [editableUsername, setEditableUsername] = useState('')

  useEffect(() => {
    setEditableContent(content)
  }, [content])

  useEffect(() => {
    setEditableUsername(username)
  }, [username])

  const toggleEditing = (): void => {
    setIsEdit(!isEdit)
  }

  const handleSave = (): void => {
    onSave({
      id,
      content: editableContent,
      username: editableUsername,
    })
    toggleEditing()
  }

  return (
    <div className={styles.wrapper}>
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
      </div>
    </div>
  )
}

export default ReplyComment
