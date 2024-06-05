import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { CommentsActions, selectCommentsByPostId } from '../../modules/store/reducers/Comments.slice'
import { IComment } from '../../interfaces/Comment'

const STORAGE_KEY = 'commentByPostId'

interface IStoredCommentsByPostId {
  commentsByPostId: {
    [postId: string]: IComment[]
  }
}

const getStoredCommentByPostID = (): { [postId: string]: IComment[] } => {
  const storedData = localStorage.getItem(STORAGE_KEY)

  if (!storedData) return {}

  const { commentsByPostId } = JSON.parse(storedData) as IStoredCommentsByPostId

  return commentsByPostId
}

const saveCommentsByPostId = (commentByPostId: { [postId: string]: IComment[] }): void => {
  const storedData: IStoredCommentsByPostId = { commentsByPostId: { ...commentByPostId } }

  const formattedStoreData = JSON.stringify(storedData)

  localStorage.setItem(STORAGE_KEY, formattedStoreData)
}

const useCommentList = () => {
  const dispatch = useAppDispatch()

  const commentsByPostId = useAppSelector(selectCommentsByPostId)

  console.log('commentByPostId', commentsByPostId)

  useEffect(() => {
    const storedCommentList = getStoredCommentByPostID()
    Object.keys(storedCommentList).forEach((postId) => {
      const comments = storedCommentList[postId]
      dispatch(CommentsActions.addCommentsByPostId({ postId, comments }))
    })
  }, [])

  const addComment = (postId: string, comment: IComment): void => {
    dispatch(CommentsActions.addComment({ postId, comment }))

    const updatedCommentByPostId = { ...commentsByPostId }
    updatedCommentByPostId[postId] = [...(updatedCommentByPostId[postId] || []), comment]

    saveCommentsByPostId(updatedCommentByPostId)
  }

  const handleClickRemoveButton = (postId: string, commentId: string): void => {
    dispatch(CommentsActions.deleteComment({ commentId, postId }))

    const updatedCommentByPostId = { ...commentsByPostId }
    updatedCommentByPostId[postId] = updatedCommentByPostId[postId].filter((comment) => comment.id !== commentId)

    saveCommentsByPostId(updatedCommentByPostId)
  }

  const handleSaveComment = (postId: string, comment: IComment): void => {
    dispatch(CommentsActions.saveComment(comment))

    const updatedCommentByPostId = { ...commentsByPostId }
    updatedCommentByPostId[postId] = updatedCommentByPostId[postId].map((p) =>
      p.id === comment.id ? { ...comment } : p,
    )

    saveCommentsByPostId(updatedCommentByPostId)
  }

  return { commentsByPostId, addComment, handleSaveComment, handleClickRemoveButton, saveCommentsByPostId }
}

export default useCommentList
