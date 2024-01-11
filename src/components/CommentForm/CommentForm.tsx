import { FC, FormEvent, useState } from 'react'
import ButtonAdd from '../buttons/ButtonAdd/ButtonAdd'
import { v4 } from 'uuid'
import styles from './CommentForm.module.css'
import NormalInput from '../inputs/NormalInput/NormalInput'
import NormalTextArea from '../textAreas/NormalTextArea/NormalTextArea'

export interface IReplyComment {
  id: string
  content: string
  username: string
}

export interface IComment {
  id: string
  title: string
  content: string
  username: string
  replyCommentList: IReplyComment[]
}

interface IInputsState {
  title: string
  content: string
  username: string
}

interface IProps {
  addComment: (comment: IComment) => void
}

const CommentForm: FC<IProps> = ({ addComment }) => {
  const [{ title, content, username }, setInputsState] = useState<IInputsState>({
    title: '',
    content: '',
    username: '',
  })

  const handleChangeInput = (name: string, inputValue: string): void => {
    setInputsState((prevState) => ({ ...prevState, [name]: inputValue }))
  }

  const handleSubmit = (e: FormEvent): void => {
    e.preventDefault()

    const newComment: IComment = {
      id: v4(),
      title: title,
      content: content,
      username: username,
      replyCommentList: [],
    }

    addComment(newComment)

    setInputsState({ title: '', content: '', username: '' })
  }

  return (
    <div className={'main'}>
      <div className={styles.wrapper}>
        <form
          className={styles.form}
          onSubmit={(e) => handleSubmit(e)}
        >
          <div className={styles.inputs}>
            <div className={styles.input}>
              <NormalInput
                label={'Title'}
                value={title}
                onChange={(titleValue) => handleChangeInput('title', titleValue)}
              />
            </div>

            <div className={styles.input}>
              <NormalInput
                label={'Username'}
                value={username}
                onChange={(usernameValue) => handleChangeInput('username', usernameValue)}
              />
            </div>
          </div>

          <div className={styles.textArea}>
            <NormalTextArea
              label={'Comment'}
              value={content}
              onChange={(contentValue) => handleChangeInput('content', contentValue)}
            />
          </div>

          <div className={styles['button-wrapper']}>
            <div className={styles.button}>
              <ButtonAdd />
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CommentForm
