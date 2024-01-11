import { FC, FormEvent, useState } from 'react'
import ButtonAdd from '../buttons/ButtonAdd/ButtonAdd'
import { v4 } from 'uuid'
import styles from './ReplyCommentForm.module.css'
import NormalInput from '../inputs/NormalInput/NormalInput'
import NormalTextArea from '../textAreas/NormalTextArea/NormalTextArea'
import { IReplyComment } from '../CommentForm/CommentForm'

interface IInputsState {
  content: string
  username: string
}

interface IProps {
  addReplyComment: (comment: IReplyComment) => void
}

const ReplyCommentForm: FC<IProps> = ({ addReplyComment }) => {
  const [{ content, username }, setInputsState] = useState<IInputsState>({
    content: '',
    username: '',
  })

  const handleChangeInput = (name: string, inputValue: string): void => {
    setInputsState((prevState) => ({ ...prevState, [name]: inputValue }))
  }

  const handleSubmit = (e: FormEvent): void => {
    e.preventDefault()

    const newReplyComment: IReplyComment = {
      id: v4(),
      content: content,
      username: username,
    }

    addReplyComment(newReplyComment)

    setInputsState({ content: '', username: '' })
  }

  return (
    <div className={'main'}>
      <div className={styles.wrapper}>
        <form
          className={styles.form}
          onSubmit={(e) => handleSubmit(e)}
        >
          <div className={styles.input}>
            <NormalInput
              label={'Username'}
              value={username}
              onChange={(usernameValue) => handleChangeInput('username', usernameValue)}
            />
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

export default ReplyCommentForm
