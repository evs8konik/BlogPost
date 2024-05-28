import { FC, useEffect, useMemo, useState } from 'react'
import { IComment, IReplyComment, currentDate, currentTime } from '../CommentForm/CommentForm'
import NormalTextArea from '../textAreas/NormalTextArea/NormalTextArea'

import Styled from './Comment.styles'
import ButtonNormal from '../buttons/ButtonNormal/ButtonNormal'
import { AccountSelectors } from '../../modules/store/reducers/Account.slice'
import NormalInput from '../inputs/NormalInput/NormalInput'
import { saveAs } from 'file-saver'
import uploadPng from './asset/images/6711359.png'
import InputUpload from '../inputs/InputUpload/InputUpload'
import useReplyCommentList from '../../hooks/useReplyCommentList copy/useReplyCommentList'
import { useAppSelector } from '../../app/hooks'
import ReplyComment from '../ReplyComment/ReplyComment'
import ReplyCommentForm from '../ReplyCommentForm/ReplyCommentForm'

type TProps = {
  onClick: (postId: string, id: string) => void
  onSave: (userId: string, content: IComment) => void
} & IComment

export const base64toBlob = (base64Data: string) => {
  const base64String = base64Data.split(',')[1]

  const byteCharacters = atob(base64String)
  const byteNumbers = new Array(byteCharacters.length)

  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i)
  }

  const byteArray = new Uint8Array(byteNumbers)
  return new Blob([byteArray], { type: 'image/jpg' })
}

const Comment: FC<TProps> = ({ id, title, content, picture, owner, date, time, postId, onClick, onSave }) => {
  const currentUser = useAppSelector(AccountSelectors.selectCurrentUser)
  const { repliesByCommentId, addReply, handleSaveReply, handleClickRemoveButton } = useReplyCommentList()

  const replyCommentList: IReplyComment[] = useMemo(() => {
    if (repliesByCommentId && repliesByCommentId[id]) {
      return repliesByCommentId[id] || []
    } else {
      return []
    }
  }, [repliesByCommentId, id])

  const [isEdit, setIsEdit] = useState(false)
  const [isReply, setIsReply] = useState(false)
  const [editableTitle, setEditableTitle] = useState(title)
  const [editableContent, setEditableContent] = useState(content)
  const [editablePicture, setEditablePicture] = useState(picture)

  useEffect(() => {
    setEditableTitle(title)
  }, [title])

  useEffect(() => {
    setEditableContent(content)
  }, [content])

  useEffect(() => {
    setEditablePicture(picture)
  }, [picture])

  const toggleEditing = (): void => {
    setIsEdit(!isEdit)
  }

  const toggleReplay = (): void => {
    setIsReply(!isReply)
  }

  const handleSave = (): void => {
    onSave(postId, {
      id,
      postId,
      title: editableTitle,
      content: editableContent,
      picture: editablePicture,
      owner,
      date: currentDate,
      time: currentTime,
    })

    isReply ? setIsReply(!isReply) : setIsReply(isReply)
    isEdit ? setIsEdit(!isEdit) : setIsEdit(isEdit)
  }

  const handleClickSavePictureButton = (picture: string) => {
    const base64Picture = picture

    const blob = base64toBlob(base64Picture)

    saveAs(blob, 'image.jpg')
  }

  const checkIfNeedToShowEditDeleteButton = () => {
    return owner.email === currentUser?.email
  }

  const checkIfNeedToShowReplyButton = () => {
    return currentUser !== null
  }

  return (
    <Styled.Wrapper>
      <Styled.Title>
        {isEdit ? (
          <NormalInput
            label="title"
            value={editableTitle}
            type={'text'}
            onChange={setEditableTitle}
          />
        ) : (
          <div className={'title'}>{title}</div>
        )}
      </Styled.Title>

      <Styled.Content>
        {isEdit ? (
          <NormalTextArea
            label="Comment"
            value={editableContent}
            onChange={setEditableContent}
          />
        ) : (
          <div className={'content'}>{content}</div>
        )}
      </Styled.Content>

      <Styled.Username>{owner.firstName}</Styled.Username>

      {isEdit ? (
        <InputUpload onChange={setEditablePicture} />
      ) : (
        <Styled.WrapperImg>
          <Styled.Img
            src={picture}
            alt=""
          ></Styled.Img>

          <Styled.ImgSave
            src={uploadPng}
            alt=""
            onClick={() => handleClickSavePictureButton(picture)}
          />
        </Styled.WrapperImg>
      )}

      <Styled.WrapperDateAndTime>
        <Styled.Date>
          {date.dayOfMonth}.{date.month}.{date.year}
        </Styled.Date>
        <Styled.Time>
          {time.hours}:{time.minutes}
        </Styled.Time>
      </Styled.WrapperDateAndTime>

      <Styled.ButtonWrapper>
        {checkIfNeedToShowEditDeleteButton() ? (
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
              onClick={() => onClick(postId || '', id)}
            >
              Delete
            </ButtonNormal>
          </>
        ) : null}

        {checkIfNeedToShowReplyButton() ? (
          <>
            {isReply ? (
              <ButtonNormal
                preset="save"
                onClick={handleSave}
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
      </Styled.ButtonWrapper>

      {isReply ? (
        <ReplyCommentForm
          addReplyComment={addReply}
          commentId={id}
        />
      ) : null}

      {replyCommentList.map((reply) => {
        return (
          <ReplyComment
            key={reply.id}
            commentOwner={owner}
            onClick={handleClickRemoveButton}
            onSave={handleSaveReply}
            {...reply}
          />
        )
      })}
    </Styled.Wrapper>
  )
}

export default Comment
