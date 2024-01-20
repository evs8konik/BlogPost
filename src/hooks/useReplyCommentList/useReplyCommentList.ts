import { useEffect, useState } from 'react'
import { IReplyComment } from '../../components/CommentForm/CommentForm'

const STORAGE_KEY = 'replyCommentList'

interface IStoredReplyCommentList {
  replyCommentList: IReplyComment[]
}

const getStoredReplyCommentList = (): IReplyComment[] => {
  const storedData = localStorage.getItem(STORAGE_KEY)

  if (!storedData) return []

  const { replyCommentList } = JSON.parse(storedData) as IStoredReplyCommentList

  return replyCommentList
}

const saveReplyCommentList = (replyCommentList: IReplyComment[]): void => {
  const storedData: IStoredReplyCommentList = { replyCommentList: [...replyCommentList] }

  const formattedStoreData = JSON.stringify(storedData)

  localStorage.setItem(STORAGE_KEY, formattedStoreData)
}

const useReplyCommentList = () => {
  const [replyCommentList, setReplyCommentList] = useState<IReplyComment[]>([])

  useEffect(() => {
    const storedReplyCommentList = getStoredReplyCommentList()

    setReplyCommentList(storedReplyCommentList)

    console.log('STORED_REPLY_COMMENT_LIST', storedReplyCommentList)
  }, [])

  const addReplyComment = (reply: IReplyComment): void => {
    const newReplyCommentList = [...replyCommentList, reply]

    setReplyCommentList(newReplyCommentList)
    saveReplyCommentList(newReplyCommentList)
  }

  const handleClickReplyRemoveButton = (replyCommentId: string): void => {
    const newReplyCommentList = replyCommentList.filter((reply) => reply.id !== replyCommentId)

    setReplyCommentList(newReplyCommentList)
    saveReplyCommentList(newReplyCommentList)
  }

  const handleSaveReplyComment = (data: IReplyComment): void => {
    const newReplyCommentList = replyCommentList.map((reply) => {
      if (reply.id === data.id) {
        return { ...reply, ...data }
      }

      return reply
    })

    setReplyCommentList(newReplyCommentList)
    saveReplyCommentList(newReplyCommentList)
  }

  return { replyCommentList, addReplyComment, handleSaveReplyComment, handleClickReplyRemoveButton }
}

export default useReplyCommentList
