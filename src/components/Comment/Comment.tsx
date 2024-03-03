import { FC, useEffect, useState } from 'react'

import { IComment, IReplyComment } from '../CommentForm/CommentForm'
import NormalTextArea from '../textAreas/NormalTextArea/NormalTextArea'
import ReplyCommentForm from '../ReplyCommentForm/ReplyCommentForm'
import ReplyComment from '../ReplyComment/ReplyComment'
import Styled from './Comment.styles'
import ButtonNormal from '../buttons/ButtonNormal/ButtonNormal'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { CommentsActions } from '../../modules/Comments/store/reducers/Comments.slice'
import useCommentList from '../../hooks/useCommentList/useCommentList'
import { AccountSelectors } from '../../modules/Comments/store/reducers/Account.slice'
import NormalInput from '../inputs/NormalInput/NormalInput'
import { saveAs } from 'file-saver'
import uploadPng from './asset/images/6711359.png'
import InputUpload from '../inputs/InputUpload/InputUpload'

type TProps = { onClick: (id: string) => void; onSave: (data: IComment) => void } & IComment

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

const Comment: FC<TProps> = ({ id, title, content, picture, owner, replyCommentList, onClick, onSave }) => {
  const dispatch = useAppDispatch()

  const { commentList, saveCommentList } = useCommentList()

  const currentUser = useAppSelector(AccountSelectors.selectCurrentUser)

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
    onSave({
      id,
      title: editableTitle,
      content: editableContent,
      picture: editablePicture,
      owner,
      replyCommentList,
    })

    isReply ? setIsReply(!isReply) : setIsReply(isReply)
    isEdit ? setIsEdit(!isEdit) : setIsEdit(isEdit)
  }

  const addReply = (reply: IReplyComment): void => {
    dispatch(CommentsActions.addReplyComment({ commentId: id, reply }))

    saveCommentList(
      commentList.map((comment) => {
        if (comment.id !== id) return comment

        return { ...comment, replyCommentList: [...comment.replyCommentList, reply] }
      }),
    )
  }

  const handleSaveReplyEditComment = (replyComment: IReplyComment): void => {
    dispatch(CommentsActions.saveReplyComment({ commentId: id, replyComment, replyCommentId: replyComment.id }))

    saveCommentList(
      commentList.map((comment) => {
        if (comment.id !== id) return comment

        return {
          ...comment,
          replyCommentList: comment.replyCommentList.map((reply) => {
            if (reply.id === replyComment.id) {
              return {
                ...reply,
                ...replyComment,
              }
            }

            return reply
          }),
        }
      }),
    )
  }

  const handleClickReplyRemoveButton = (replyCommentId: string): void => {
    dispatch(CommentsActions.deleteReplyComment({ commentId: id, replyCommentId }))

    saveCommentList(
      commentList.map((comment) => {
        if (comment.id !== id) return comment

        return {
          ...comment,
          replyCommentList: [...comment.replyCommentList.filter((reply) => reply.id !== replyCommentId)],
        }
      }),
    )
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
              onClick={() => onClick(id)}
            >
              Delete
            </ButtonNormal>
          </>
        ) : null}

        {/* Часть с ответом на комментарий */}

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

      {isReply ? <ReplyCommentForm addReplyComment={addReply} /> : null}

      {replyCommentList.map((reply) => {
        return (
          <ReplyComment
            key={reply.id}
            commentOwner={owner}
            onClick={handleClickReplyRemoveButton}
            onSave={handleSaveReplyEditComment}
            {...reply}
          />
        )
      })}
    </Styled.Wrapper>
  )
}

export default Comment
