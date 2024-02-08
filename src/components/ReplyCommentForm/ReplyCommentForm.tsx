import { FC, FormEvent, useState } from 'react'
import { v4 } from 'uuid'
import NormalTextArea from '../textAreas/NormalTextArea/NormalTextArea'
import { IReplyComment } from '../CommentForm/CommentForm'
import { useLoginContext } from '../../context/LoginContext/LoginContext'
import ButtonNormal from '../buttons/ButtonNormal/ButtonNormal'
import Styled from './ReplyCommentForm.styles'

interface IInputsState {
  content: string
}

interface IProps {
  addReplyComment: (comment: IReplyComment) => void
}

const ReplyCommentForm: FC<IProps> = ({ addReplyComment }) => {
  const { currentUser } = useLoginContext()

  const [{ content }, setInputsState] = useState<IInputsState>({
    content: '',
  })

  const handleChangeInput = (name: string, inputValue: string): void => {
    setInputsState((prevState) => ({ ...prevState, [name]: inputValue }))
  }

  const handleSubmit = (e: FormEvent): void => {
    e.preventDefault()

    if (!currentUser) return

    const newReplyComment: IReplyComment = {
      id: v4(),
      content: content,
      owner: currentUser,
    }

    addReplyComment(newReplyComment)

    setInputsState({ content: '' })
  }

  return (
    <Styled.Wrapper>
      <Styled.Form onSubmit={(e) => handleSubmit(e)}>
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

export default ReplyCommentForm
