import { FC, useEffect, useState } from 'react'
import { IReplyComment } from '../CommentForm/CommentForm'
import NormalTextArea from '../textAreas/NormalTextArea/NormalTextArea'
import { IUser, useLoginContext } from '../../context/LoginContext/LoginContext'
import ButtonNormal from '../buttons/ButtonNormal/ButtonNormal'
import { Wrapper, Content, Username, ButtonWrapper } from './ReplyComment.styles'

type TProps = {
  commentOwner: IUser
  onClick: (id: string) => void
  onSave: (data: IReplyComment) => void
} & IReplyComment

const ReplyComment: FC<TProps> = ({ commentOwner, id, content, owner, onClick, onSave }) => {
  const { currentUser } = useLoginContext()

  const [isEdit, setIsEdit] = useState(false)

  const [editableContent, setEditableContent] = useState('')

  useEffect(() => {
    setEditableContent(content)
  }, [content])

  const toggleEditing = (): void => {
    setIsEdit(!isEdit)
  }

  const handleSave = (): void => {
    onSave({
      id,
      content: editableContent,
      owner,
    })
    toggleEditing()
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
    <Wrapper>
      <Content>
        {isEdit ? (
          <NormalTextArea
            label="Comment"
            value={editableContent}
            onChange={setEditableContent}
          />
        ) : (
          <Content>{content}</Content>
        )}
      </Content>

      <Username>{owner.firstName}</Username>

      <ButtonWrapper>
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
            onClick={() => onClick(id)}
          >
            Delete
          </ButtonNormal>
        ) : null}
      </ButtonWrapper>
    </Wrapper>
  )
}

export default ReplyComment
