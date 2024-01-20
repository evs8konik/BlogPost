import { useEffect, useState } from 'react'
import { IComment } from '../../components/CommentForm/CommentForm'

// Ключ для хранения списка комментариев в localStorage
const STORAGE_KEY = 'commentList'

// Интерфейс формата хранения списка комментариев в localStorage
interface IStoredCommentList {
  commentList: IComment[]
}

// Функция для получения списка комментариев из localStorage
const getStoredCommentList = (): IComment[] => {
  const storedData = localStorage.getItem(STORAGE_KEY)

  if (!storedData) return []

  const { commentList } = JSON.parse(storedData) as IStoredCommentList

  return commentList
}

//Функция сохранения изменений в localStorage
const saveCommentList = (commentList: IComment[]): void => {
  const storedData: IStoredCommentList = { commentList: [...commentList] }

  const formattedStoreData = JSON.stringify(storedData)

  localStorage.setItem(STORAGE_KEY, formattedStoreData)
}

// Хук взаимодействия со списком комментариев
const useCommentList = () => {
  const [commentList, setCommentList] = useState<IComment[]>([])

  useEffect(() => {
    // Получение списка комментариев из localStorage при загрузке компонента
    const storedCommentList = getStoredCommentList()

    setCommentList(storedCommentList)

    console.log('STORED_COMMENT_LIST', storedCommentList)
  }, [])

  // Функция добавления нового комментария
  const addComment = (comment: IComment): void => {
    const newCommentList = [...commentList, comment]

    setCommentList(newCommentList)
    saveCommentList(newCommentList)
  }

  // Функция обработки нажатия на кнопку удаления комментария
  const handleClickRemoveButton = (commentId: string): void => {
    const newCommentList = commentList.filter((comment) => comment.id !== commentId)

    setCommentList(newCommentList)
    saveCommentList(newCommentList)
  }

  // Функция обновления комментария
  const handleSaveComment = (data: IComment): void => {
    const newCommentList = commentList.map((comment) => {
      if (comment.id === data.id) {
        return { ...comment, ...data }
      }

      return comment
    })

    setCommentList(newCommentList)
    saveCommentList(newCommentList)
  }

  return { commentList, addComment, handleSaveComment, handleClickRemoveButton }
}

export default useCommentList
