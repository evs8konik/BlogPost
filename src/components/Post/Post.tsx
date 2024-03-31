import { FC, useEffect, useState } from 'react'
import { currentDate, currentTime } from '../CommentForm/CommentForm'
import NormalTextArea from '../textAreas/NormalTextArea/NormalTextArea'
import Styled from './Post.styles'
import ButtonNormal from '../buttons/ButtonNormal/ButtonNormal'
import { AccountSelectors } from '../../modules/Comments/store/reducers/Account.slice'
import NormalInput from '../inputs/NormalInput/NormalInput'
import { saveAs } from 'file-saver'
import uploadPng from './asset/images/6711359.png'
import InputUpload from '../inputs/InputUpload/InputUpload'
import { base64toBlob } from '../Comment/Comment'
import { IPost } from '../../modules/common/models/Post/Post'
import { useAppSelector } from '../../app/hooks'

type TProps = {
  onClick: (userId: string, id: string) => void
  prevVersion: boolean
  onClickPost: () => void
  onSave: (userId: string, data: IPost) => void
} & IPost

const Post: FC<TProps> = ({
  id,
  userId,
  title,
  body,
  picture,
  owner,
  date,
  time,
  prevVersion,
  // replyCommentList,
  onClickPost,
  onClick,
  onSave,
}) => {
  const currentUser = useAppSelector(AccountSelectors.selectCurrentUser)

  const [isEdit, setIsEdit] = useState(false)

  const [editableTitle, setEditableTitle] = useState(title)
  const [editableBody, setEditableBody] = useState(body)
  const [editablePicture, setEditablePicture] = useState(picture)

  useEffect(() => {
    setEditableTitle(title)
  }, [title])

  useEffect(() => {
    setEditableBody(body)
  }, [body])

  useEffect(() => {
    setEditablePicture(picture)
  }, [picture])

  const toggleEditing = (): void => {
    setIsEdit(!isEdit)
  }

  const handleSave = (): void => {
    onSave(userId, {
      id,

      userId,
      title: editableTitle,
      body: editableBody,
      picture: editablePicture,
      owner,
      date: currentDate,
      time: currentTime,
    })

    isEdit ? setIsEdit(!isEdit) : setIsEdit(isEdit)
  }

  const handleClickSavePictureButton = (picture: string) => {
    const base64Picture = picture

    const blob = base64toBlob(base64Picture)

    saveAs(blob, 'image.jpg')
  }

  const checkIfNeedToShowEditDeleteButton = () => {
    return owner?.email === currentUser?.email
  }

  return (
    <>
      {prevVersion ? (
        <Styled.Wrapper onClick={onClickPost}>
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
                value={editableBody}
                onChange={setEditableBody}
              />
            ) : (
              <div className={'content'}>{body}</div>
            )}
          </Styled.Content>

          <Styled.Username>{owner?.firstName}</Styled.Username>

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
                onClick={() => {
                  if (picture) {
                    handleClickSavePictureButton(picture)
                  } else {
                  }
                }}
              />
            </Styled.WrapperImg>
          )}

          <Styled.WrapperDateAndTime>
            <Styled.Date>
              {date?.dayOfMonth}.{date?.month}.{date?.year}
            </Styled.Date>

            <Styled.Time>
              {time?.hours}:{time?.minutes}
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
                  onClick={() => onClick(currentUser?.email || '', id)}
                >
                  Delete
                </ButtonNormal>
              </>
            ) : null}
          </Styled.ButtonWrapper>
        </Styled.Wrapper>
      ) : (
        <Styled.PrevWrapper onClick={onClickPost}>
          <Styled.Title>{title}</Styled.Title>

          <Styled.Content>{body}</Styled.Content>

          <Styled.Username>{owner?.firstName}</Styled.Username>

          <Styled.WrapperDateAndTime>
            <Styled.Date>
              {date?.dayOfMonth}.{date?.month}.{date?.year}
            </Styled.Date>
            <Styled.Time>
              {time?.hours}:{time?.minutes}
            </Styled.Time>
          </Styled.WrapperDateAndTime>
        </Styled.PrevWrapper>
      )}
    </>
  )
}

export default Post
