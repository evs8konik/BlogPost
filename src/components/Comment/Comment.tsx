import { FC, useEffect, useState } from 'react'
// import styles from './Comment.module.css'
import NormalInput from '../inputs/NormalInput/NormalInput'
import { IComment, IReplyComment } from '../CommentForm/CommentForm'
import NormalTextArea from '../textAreas/NormalTextArea/NormalTextArea'
import ReplyCommentForm from '../ReplyCommentForm/ReplyCommentForm'
import ReplyComment from '../ReplyComment/ReplyComment'
import { Wrapper, Title, Content, Username, ButtonWrapper } from './Comment.styles'
import { useLoginContext } from '../../context/LoginContext/LoginContext'
import ButtonNormal from '../buttons/ButtonNormal/ButtonNormal'

type TProps = { onClick: (id: string) => void; onSave: (data: IComment) => void } & IComment

const Comment: FC<TProps> = ({ id, title, content, owner, replyCommentList, onClick, onSave }) => {
  const { currentUser } = useLoginContext()

  // const [replyCommentList, setReplyCommentList] = useState<IReplyComment[]>([])

  // const { replyCommentList, addReplyComment, handleSaveReplyComment, handleClickReplyRemoveButton } =
  //   useReplyCommentList(id)

  const [isEdit, setIsEdit] = useState(false)
  const [isReply, setIsReply] = useState(false)

  const [editableTitle, setEditableTitle] = useState(title)
  const [editableContent, setEditableContent] = useState(content)
  const [editableReplyList, setEditableReplayList] = useState<IReplyComment[]>([])

  useEffect(() => {
    setEditableTitle(title)
  }, [title])

  useEffect(() => {
    setEditableContent(content)
  }, [content])

  useEffect(() => {
    setEditableReplayList(replyCommentList)
  }, [replyCommentList])

  const toggleEditing = (): void => {
    setIsEdit(!isEdit)
  }

  const toggleReplay = (): void => {
    setIsReply(!isReply)
  }

  const handleSave = (): void => {
    console.log('TEST_DATA', replyCommentList)

    onSave({
      id,
      title: editableTitle,
      content: editableContent,
      owner,
      replyCommentList: editableReplyList,
    })

    isReply ? setIsReply(!isReply) : setIsReply(isReply)
    isEdit ? setIsEdit(!isEdit) : setIsEdit(isEdit)
  }

  const addReply = (reply: IReplyComment): void => {
    const newCommentList = [...editableReplyList, reply]

    // setEditableReplayList((prevReplyList) => [...prevReplyList, reply])
    setEditableReplayList(newCommentList)
    handleSave()
  }

  const handleSaveReplyEditComment = (data: IReplyComment): void => {
    const newReplyCommentList = replyCommentList.map((reply) => {
      if (reply.id === data.id) {
        return { ...reply, ...data }
      }

      return reply
    })

    setEditableReplayList(newReplyCommentList)
    handleSave()
    // saveReplyCommentList(replyId, newReplyCommentList)
  }

  const handleClickReplyRemoveButton = (replyCommentId: string): void => {
    const newReplyCommentList = replyCommentList.filter((reply) => reply.id !== replyCommentId)

    setEditableReplayList(newReplyCommentList)
    handleSave()
    // saveReplyCommentList(replyId, newReplyCommentList)
  }

  const checkIfNeedToShowEditDeletButton = () => {
    return owner.email === currentUser?.email
  }

  const checkIfNeedToShowReplyButton = () => {
    return currentUser !== null
  }

  return (
    <Wrapper>
      <Title>
        {isEdit ? (
          <NormalInput
            label="title"
            value={editableTitle}
            onChange={setEditableTitle}
          />
        ) : (
          <div className={'title'}>{title}</div>
        )}
      </Title>

      <Content>
        {isEdit ? (
          <NormalTextArea
            label="Comment"
            value={editableContent}
            onChange={setEditableContent}
          />
        ) : (
          <div className={'content'}>{content}</div>
        )}
      </Content>

      <Username>{owner.firstName}</Username>

      <ButtonWrapper>
        {checkIfNeedToShowEditDeletButton() ? (
          <div>
            <div>
              {isEdit ? (
                <ButtonNormal
                  preset="save"
                  // onClick={handleSave}
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

            <div>
              <ButtonNormal
                preset="delete"
                onClick={() => onClick(id)}
              >
                Delete
              </ButtonNormal>
            </div>
          </div>
        ) : null}

        {/* Часть с ответом на комментарий */}

        {checkIfNeedToShowReplyButton() ? (
          <div>
            {isReply ? (
              <ButtonNormal
                preset="save"
                // onClick={handleSave}
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
          </div>
        ) : null}
      </ButtonWrapper>

      <div>{isReply ? <ReplyCommentForm addReplyComment={addReply} /> : null}</div>

      <div>
        <div>
          {editableReplyList.map((reply) => {
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
        </div>
      </div>
    </Wrapper>
  )
}

export default Comment
