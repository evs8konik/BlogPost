import { FC, useEffect, useState } from 'react'
import { currentDate, currentTime } from '../CommentForm/CommentForm'
import NormalTextArea from '../textAreas/NormalTextArea/NormalTextArea'
import ButtonNormal from '../buttons/ButtonNormal/ButtonNormal'
import Styled from './ReplyComment.styles'
import { useAppSelector } from '../../app/hooks'
import { AccountSelectors } from '../../modules/store/reducers/Account.slice'
import InputUpload from '../inputs/InputUpload/InputUpload'
import { base64toBlob } from '../Comment/Comment'
import { saveAs } from 'file-saver'
import uploadPng from '../Comment/asset/images/6711359.png'
import { IReplyComment } from '../../interfaces/ReplyComment'
import { IUser } from '../../interfaces/User'

type TProps = {
  commentOwner: IUser
  onClick: (commentId: string, id: string) => void
  onSave: (userId: string, data: IReplyComment) => void
} & IReplyComment

const ReplyComment: FC<TProps> = ({
  commentOwner,
  id,
  content,
  picture,
  owner,
  date,
  time,
  commentId,
  onClick,
  onSave,
}) => {
  const currentUser = useAppSelector(AccountSelectors.selectCurrentUser)

  const [isEdit, setIsEdit] = useState(false)
  const [editableContent, setEditableContent] = useState('')
  const [editablePicture, setEditablePicture] = useState(picture)

  useEffect(() => {
    setEditableContent(content)
  }, [content])

  useEffect(() => {
    setEditablePicture(picture)
  }, [picture])

  const toggleEditing = (): void => {
    setIsEdit(!isEdit)
  }

  const handleSave = (): void => {
    onSave(commentId, {
      id,
      commentId,
      content: editableContent,
      picture: editablePicture,
      owner,
      date: currentDate,
      time: currentTime,
    })

    toggleEditing()
  }

  const handleClickSavePictureButton = (picture: string) => {
    const base64Picture = picture

    const blob = base64toBlob(base64Picture)

    saveAs(blob, 'image.jpg')
  }

  const checkIfNeedToShowEditButton = () => {
    if (owner.email === currentUser?.email || owner.firstName === currentUser?.firstName) return true

    return false
  }

  const checkIfNeedToShowDeleteButton = () => {
    if (
      (owner.email === currentUser?.email && owner.firstName === currentUser?.firstName) ||
      (commentOwner.email === currentUser?.email && commentOwner.firstName === currentUser?.firstName)
    )
      return true

    return false
  }

  return (
    <Styled.Wrapper>
      <Styled.Content>
        {isEdit ? (
          <NormalTextArea
            label="Comment"
            value={editableContent}
            onChange={setEditableContent}
          />
        ) : (
          <Styled.Content>{content}</Styled.Content>
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
        {checkIfNeedToShowEditButton() ? (
          <div>
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
          </div>
        ) : null}

        {checkIfNeedToShowDeleteButton() ? (
          <ButtonNormal
            preset="delete"
            onClick={() => onClick(commentId, id)}
          >
            Delete
          </ButtonNormal>
        ) : null}
      </Styled.ButtonWrapper>
    </Styled.Wrapper>
  )
}

export default ReplyComment
