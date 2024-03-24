import { useEffect } from 'react'
import { IComment } from '../../components/CommentForm/CommentForm'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import {
  CommentsActions,
  selectCommentList,
  selectCommentsByPostId,
} from '../../modules/Comments/store/reducers/Comments.slice'

// const STORAGE_KEY = 'commentList'

const STORAGE_KEY = 'commentByPostId'

interface IStoredCommentList {
  commentList: IComment[]
}

const getStoredCommentList = (): IComment[] => {
  const storedData = localStorage.getItem(STORAGE_KEY)

  if (!storedData) return []

  const { commentList } = JSON.parse(storedData) as IStoredCommentList

  return commentList
}

const saveCommentList = (commentList: IComment[]): void => {
  const storedData: IStoredCommentList = { commentList: [...commentList] }

  const formattedStoreData = JSON.stringify(storedData)

  localStorage.setItem(STORAGE_KEY, formattedStoreData)
}

const useReplyCommentList = () => {
  const dispatch = useAppDispatch()

  const commentList = useAppSelector(selectCommentList)

  const commentByPostId = useAppSelector(selectCommentsByPostId)

  console.log('commentByPostId', commentByPostId)

  useEffect(() => {
    const storedCommentList = getStoredCommentList()

    dispatch(CommentsActions.addCommentList(storedCommentList))
  }, [])

  const addComment = (postId: string, comment: IComment): void => {
    dispatch(CommentsActions.addComment({ postId, comment }))

    saveCommentList([...commentList, comment])
  }

  const handleClickRemoveButton = (commentId: string): void => {
    dispatch(CommentsActions.deleteComment(commentId))

    saveCommentList(commentList.filter((comment) => comment.id !== commentId))
  }

  const handleSaveComment = (data: IComment): void => {
    dispatch(CommentsActions.saveComment(data))

    saveCommentList(
      commentList.map((comment) => {
        if (comment.id === data.id) {
          return { ...comment, ...data }
        }
        return comment
      }),
    )
  }

  return { commentList, addComment, handleSaveComment, handleClickRemoveButton, saveCommentList }
}

export default useReplyCommentList
