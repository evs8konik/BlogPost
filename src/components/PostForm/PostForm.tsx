import { FC, FormEvent, useState } from 'react'
import { v4 } from 'uuid'
import NormalTextArea from '../textAreas/NormalTextArea/NormalTextArea'
import ButtonNormal from '../buttons/ButtonNormal/ButtonNormal'
import Styled from './PostForm.styles'
import { useAppSelector } from '../../app/hooks'
import { AccountSelectors } from '../../modules/store/reducers/Account.slice'
import NormalInput from '../inputs/NormalInput/NormalInput'
import InputUpload from '../inputs/InputUpload/InputUpload'
import { IPost } from '../../modules/common/models/Post/Post'
import { currentDate, currentTime } from '../CommentForm/CommentForm'

interface IInputsState {
  title: string
  body: string
  picture?: string
}

interface IProps {
  addPost: (userId: string, post: IPost) => void
}

const PostForm: FC<IProps> = ({ addPost }) => {
  const currentUser = useAppSelector(AccountSelectors.selectCurrentUser)

  const [{ title, body, picture }, setInputsState] = useState<IInputsState>({
    title: '',
    body: '',
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

    if (!currentUser || !currentUser.email) {
      console.error('Current user or email is undefined')
      return
    }

    const newPost: IPost = {
      userId: currentUser.email,
      id: v4(),
      title: title,
      body: body,
      picture: picture,
      owner: currentUser,
      date: currentDate,
      time: currentTime,
      isShow: true,
    }

    addPost(currentUser.email, newPost)

    setInputsState({ title: '', body: '', picture: '' })
  }

  return (
    <Styled.PostFormWrapper>
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
            label={'Content'}
            value={body}
            onChange={(bodyValue) => handleChangeInput('body', bodyValue)}
          />

          <InputUpload onChange={(pictureValue) => handleFileChangeInput('picture', pictureValue)} />

          <Styled.ButtonWrapper>
            <ButtonNormal preset="add">Add Post</ButtonNormal>
          </Styled.ButtonWrapper>
        </Styled.Form>
      </Styled.Wrapper>
    </Styled.PostFormWrapper>
  )
}

export default PostForm
