import { FC, FormEvent, useState } from 'react'
import { v4 } from 'uuid'
import NormalInput from '../inputs/NormalInput/NormalInput'
import NormalTextArea from '../textAreas/NormalTextArea/NormalTextArea'
import { IUser, useLoginContext } from '../../context/LoginContext/LoginContext'
import ButtonNormal from '../buttons/ButtonNormal/ButtonNormal'
import Styled from './CommentForm.styles'

export interface IReplyComment {
  id: string
  content: string
  owner: IUser
}

export interface IComment {
  id: string
  title: string
  content: string
  owner: IUser
  replyCommentList: IReplyComment[]
}

interface IInputsState {
  title: string
  content: string
}

interface IProps {
  addComment: (comment: IComment) => void
}

const CommentForm: FC<IProps> = ({ addComment }) => {
  const { currentUser } = useLoginContext()

  const [{ title, content }, setInputsState] = useState<IInputsState>({
    title: '',
    content: '',
  })

  const handleChangeInput = (name: string, inputValue: string): void => {
    setInputsState((prevState) => ({ ...prevState, [name]: inputValue }))
  }

  const handleSubmit = (e: FormEvent): void => {
    e.preventDefault()

    if (!currentUser) return

    const newComment: IComment = {
      id: v4(),
      title: title,
      content: content,
      owner: currentUser,
      replyCommentList: [],
    }

    addComment(newComment)

    setInputsState({ title: '', content: '' })
  }

  return (
    <Styled.Wrapper>
      <Styled.Form onSubmit={(e) => handleSubmit(e)}>
        <NormalInput
          label={'Title'}
          value={title}
          onChange={(titleValue) => handleChangeInput('title', titleValue)}
        />

        <NormalTextArea
          label={'Comment'}
          value={content}
          onChange={(contentValue) => handleChangeInput('content', contentValue)}
        />

        <Styled.ButtonWrapper>
          <ButtonNormal preset="add">Add comment</ButtonNormal>
        </Styled.ButtonWrapper>
      </Styled.Form>
    </Styled.Wrapper>
  )
}

export default CommentForm
