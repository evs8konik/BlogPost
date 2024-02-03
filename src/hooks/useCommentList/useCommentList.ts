import { useEffect, useState } from 'react'
import { IComment } from '../../components/CommentForm/CommentForm'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { CommentsActions, selectCommentList } from '../../modules/Comments/store/redusers/Comments.slice'

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
// Хук взаимодействия со списком комментариев
const useCommentList = () => {
  const dispatch = useAppDispatch()

  const commentList = useAppSelector(selectCommentList)

  useEffect(() => {
    // Получение списка комментариев из localStorage при загрузке компонента
    const storedCommentList = getStoredCommentList()
    // Если вы хотите установить список комментариев из localStorage при загрузке, раскомментируйте следующую строку:
    dispatch(CommentsActions.addCommentList(storedCommentList))
  }, [])

  // Функция добавления нового комментария
  const addComment = (comment: IComment): void => {
    dispatch(CommentsActions.addComment(comment))

    saveCommentList([...commentList, comment])
  }

  // Функция обработки нажатия на кнопку удаления комментария
  const handleClickRemoveButton = (commentId: string): void => {
    dispatch(CommentsActions.deleteComment(commentId))

    saveCommentList(commentList.filter((comment) => comment.id !== commentId))
  }

  // Функция обновления комментария
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

export default useCommentList
