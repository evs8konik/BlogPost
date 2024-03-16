import { FC, FormEvent, useState } from 'react'
import { v4 } from 'uuid'
import NormalTextArea from '../textAreas/NormalTextArea/NormalTextArea'
import ButtonNormal from '../buttons/ButtonNormal/ButtonNormal'
import Styled from './CommentForm.styles'
import { useAppSelector } from '../../app/hooks'
import { AccountSelectors } from '../../modules/Comments/store/reducers/Account.slice'
import NormalInput from '../inputs/NormalInput/NormalInput'
import InputUpload from '../inputs/InputUpload/InputUpload'

export interface IReplyComment {
  id: string
  content: string
  picture: string
  owner: IUser
  date: IDate
  time: ITime
}

export interface IComment {
  id: string
  title: string
  content: string
  picture: string
  owner: IUser
  date: IDate
  time: ITime
  replyCommentList: IReplyComment[]
}

export interface IUser {
  firstName: string
  lastName: string
  email: string
  password: string
}

export interface IDate {
  dayOfMonth: number
  month: number
  year: number
}

export interface ITime {
  hours: number
  minutes: number
  seconds: number
}

interface IInputsState {
  title: string
  content: string
  picture: string
}

interface IProps {
  addComment: (comment: IComment) => void
}

export const toBase64 = (file: File) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = (error) => reject(error)
  })

export const currentDate = {
  get dayOfMonth() {
    return new Date().getDate()
  },
  get month() {
    return new Date().getMonth() + 1
  },
  get year() {
    return new Date().getFullYear()
  },
}

export const currentTime = {
  get hours() {
    return new Date().getHours()
  },
  get minutes() {
    return new Date().getMinutes()
  },
  get seconds() {
    return new Date().getSeconds()
  },
}

const CommentForm: FC<IProps> = ({ addComment }) => {
  const currentUser = useAppSelector(AccountSelectors.selectCurrentUser)

  const [{ title, content, picture }, setInputsState] = useState<IInputsState>({
    title: '',
    content: '',
    picture: '',
  })

  const handleChangeInput = (name: string, inputValue: string): void => {
    setInputsState((prevState) => ({ ...prevState, [name]: inputValue }))
  }

  const handleFileChangeInput = (name: string, inputValue: string): void => {
    setInputsState((prevState) => ({ ...prevState, [name]: inputValue }))
  }

  const handleSubmit = (e: FormEvent): void => {
    e.preventDefault()

    if (!currentUser) return

    const newComment: IComment = {
      id: v4(),
      title: title,
      content: content,
      picture: picture,
      owner: currentUser,
      date: currentDate,
      time: currentTime,
      replyCommentList: [],
    }

    addComment(newComment)

    setInputsState({ title: '', content: '', picture: '' })
  }

  return (
    <Styled.CommentFormWrapper>
      <Styled.Wrapper onClick={(e) => console.log('console')}>
        <Styled.Form
          onSubmit={(e) => handleSubmit(e)}
          onClick={(e) => e.stopPropagation()}
        >
          <NormalInput
            label={'Title'}
            value={title}
            type={'text'}
            onChange={(titleValue) => handleChangeInput('title', titleValue)}
          />
          <NormalTextArea
            label={'Comment'}
            value={content}
            onChange={(contentValue) => handleChangeInput('content', contentValue)}
          />

          <InputUpload onChange={(pictureValue) => handleFileChangeInput('picture', pictureValue)} />

          <Styled.ButtonWrapper>
            <ButtonNormal preset="add">Add comment</ButtonNormal>
          </Styled.ButtonWrapper>
        </Styled.Form>
      </Styled.Wrapper>
    </Styled.CommentFormWrapper>
  )
}

export default CommentForm
