import { useEffect } from 'react'
import { IReplyComment } from '../../components/CommentForm/CommentForm'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { RepliesActions, selectReplyByCommentId } from '../../modules/Comments/store/reducers/ReplyComments.slice'

const STORAGE_KEY = 'replyByPostId'

interface IStoredReplyByCommentId {
  replyByCommentId: {
    [commentId: string]: IReplyComment[]
  }
}

const getStoredRepliesByCommentID = (): { [commentId: string]: IReplyComment[] } => {
  const storedData = localStorage.getItem(STORAGE_KEY)

  if (!storedData) return {}

  const { replyByCommentId } = JSON.parse(storedData) as IStoredReplyByCommentId

  return replyByCommentId
}

const saveReplyByCommentId = (replyByCommentId: { [commentId: string]: IReplyComment[] }): void => {
  const storedData: IStoredReplyByCommentId = { replyByCommentId: { ...replyByCommentId } }

  const formattedStoreData = JSON.stringify(storedData)

  localStorage.setItem(STORAGE_KEY, formattedStoreData)
}

const useReplyCommentList = () => {
  const dispatch = useAppDispatch()

  const repliesByCommentId = useAppSelector(selectReplyByCommentId)

  console.log('commentByPostId', repliesByCommentId)

  useEffect(() => {
    const storedRepliesByCommentId = getStoredRepliesByCommentID()

    if (storedRepliesByCommentId) {
      const commentIds = Object.keys(storedRepliesByCommentId)
      if (commentIds.length > 0) {
        const payload = {
          commentId: commentIds[0],
          replies: storedRepliesByCommentId[commentIds[0]],
        }
        dispatch(RepliesActions.addRepliesByCommentId(payload))
      }
    }
  }, [dispatch])

  const addReply = (commentId: string, reply: IReplyComment): void => {
    dispatch(RepliesActions.addReply({ commentId, reply }))

    const updatedRepliesByCommentId = { ...repliesByCommentId }
    updatedRepliesByCommentId[commentId] = [...(updatedRepliesByCommentId[commentId] || []), reply]

    saveReplyByCommentId(updatedRepliesByCommentId)
  }

  const handleClickRemoveButton = (commentId: string, replyId: string): void => {
    dispatch(RepliesActions.deleteReply({ commentId, replyId }))

    const updatedRepliesByCommentId = { ...repliesByCommentId }
    updatedRepliesByCommentId[commentId] = updatedRepliesByCommentId[commentId].filter((reply) => reply.id !== replyId)

    saveReplyByCommentId(updatedRepliesByCommentId)
  }

  const handleSaveReply = (commentId: string, reply: IReplyComment): void => {
    dispatch(RepliesActions.saveReply(reply))

    const updatedRepliesByCommentId = { ...repliesByCommentId }
    updatedRepliesByCommentId[commentId] = updatedRepliesByCommentId[commentId].map((p) =>
      p.id === reply.id ? { ...reply } : p,
    )

    saveReplyByCommentId(updatedRepliesByCommentId)
  }

  return { repliesByCommentId, addReply, handleSaveReply, handleClickRemoveButton, saveReplyByCommentId }
}

export default useReplyCommentList
