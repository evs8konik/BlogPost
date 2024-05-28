import { FC, FormEvent, useState } from 'react'
import { v4 } from 'uuid'
import NormalTextArea from '../textAreas/NormalTextArea/NormalTextArea'
import { IDate, IReplyComment, ITime, currentDate, currentTime } from '../CommentForm/CommentForm'
import ButtonNormal from '../buttons/ButtonNormal/ButtonNormal'
import Styled from './ReplyCommentForm.styles'
import { useAppSelector } from '../../app/hooks'
import { AccountSelectors } from '../../modules/store/reducers/Account.slice'
import InputUpload from '../inputs/InputUpload/InputUpload'

interface IInputsState {
  content: string
  picture: string
}

interface IProps {
  addReplyComment: (commentId: string, reply: IReplyComment) => void
  commentId: string
}

const ReplyCommentForm: FC<IProps> = ({ addReplyComment, commentId }) => {
  const currentUser = useAppSelector(AccountSelectors.selectCurrentUser)

  const [{ content, picture }, setInputsState] = useState<IInputsState>({
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

    const newReplyComment: IReplyComment = {
      id: v4(),
      commentId,
      content: content,
      picture: picture,
      owner: currentUser,
      date: currentDate,
      time: currentTime,
    }

    addReplyComment(commentId, newReplyComment)

    setInputsState({ content: '', picture: '' })
  }

  return (
    <Styled.Wrapper>
      <Styled.Form onSubmit={(e) => handleSubmit(e)}>
        <NormalTextArea
          label={'Comment'}
          value={content}
          onChange={(contentValue) => handleChangeInput('content', contentValue)}
        />

        <InputUpload
          label={''}
          onChange={(pictureValue) => handleFileChangeInput('picture', pictureValue)}
        />

        <Styled.ButtonWrapper>
          <ButtonNormal preset="add">Add comment</ButtonNormal>
        </Styled.ButtonWrapper>
      </Styled.Form>
    </Styled.Wrapper>
  )
}

export default ReplyCommentForm
