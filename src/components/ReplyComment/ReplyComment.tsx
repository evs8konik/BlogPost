import { FC, useEffect, useState } from 'react'
import { IReplyComment, IUser } from '../CommentForm/CommentForm'
import NormalTextArea from '../textAreas/NormalTextArea/NormalTextArea'
import ButtonNormal from '../buttons/ButtonNormal/ButtonNormal'
import Styled from './ReplyComment.styles'
import { useAppSelector } from '../../app/hooks'
import { AccountSelectors } from '../../modules/Comments/store/reducers/Account.slice'

type TProps = {
  commentOwner: IUser
  onClick: (id: string) => void
  onSave: (data: IReplyComment) => void
} & IReplyComment

const ReplyComment: FC<TProps> = ({ commentOwner, id, content, owner, onClick, onSave }) => {
  const currentUser = useAppSelector(AccountSelectors.selectCurrentUser)

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
            onClick={() => onClick(id)}
          >
            Delete
          </ButtonNormal>
        ) : null}
      </Styled.ButtonWrapper>
    </Styled.Wrapper>
  )
}

export default ReplyComment
