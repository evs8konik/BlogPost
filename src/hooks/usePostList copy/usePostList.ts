import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { IPost } from '../../modules/common/models/Post/Post'
import { PostsActions, fetchPosts, selectPostByUserId } from '../../modules/Comments/store/reducers/Post.slice'

const STORAGE_KEY = 'postByUserId'

interface IStoredPostList {
  postByUserId: {
    [userId: string]: IPost[]
  }
}

const getStoredPostList = (): { [userId: string]: IPost[] } => {
  const storedData = localStorage.getItem(STORAGE_KEY)

  if (!storedData) return {}

  const { postByUserId } = JSON.parse(storedData) as IStoredPostList

  return postByUserId
}

const savePostByUserId = (postByUserId: { [userId: string]: IPost[] }): void => {
  const storedData: IStoredPostList = { postByUserId: { ...postByUserId } }

  const formattedStoreData = JSON.stringify(storedData)

  localStorage.setItem(STORAGE_KEY, formattedStoreData)
}

const usePostList = () => {
  const dispatch = useAppDispatch()

  const postByUserId = useAppSelector(selectPostByUserId)

  useEffect(() => {
    const storedPostByUserId = getStoredPostList()

    if (Object.keys(storedPostByUserId).length > 0) {
      const payload = {
        userId: Object.keys(storedPostByUserId)[0],
        posts: storedPostByUserId[Object.keys(storedPostByUserId)[0]],
      }
      dispatch(PostsActions.addPostsByUserId(payload))
    }

    // dispatch(fetchPosts())
  }, [dispatch])

  const addPost = (userId: string, post: IPost): void => {
    dispatch(PostsActions.addPost({ userId, post }))

    const updatedPostByUserId = { ...postByUserId }
    updatedPostByUserId[userId] = [...(updatedPostByUserId[userId] || []), post]

    savePostByUserId(updatedPostByUserId)
  }

  const handleClickRemoveButton = (userId: string, postId: string): void => {
    dispatch(PostsActions.deletePost({ postId, userId }))

    const updatedPostByUserId = { ...postByUserId }
    updatedPostByUserId[userId] = updatedPostByUserId[userId].filter((post) => post.id !== postId)

    savePostByUserId(updatedPostByUserId)
  }

  const handleSavePost = (userId: string, post: IPost): void => {
    dispatch(PostsActions.savePost(post))

    const updatedPostByUserId = { ...postByUserId }
    updatedPostByUserId[userId] = updatedPostByUserId[userId].map((p) => (p.id === post.id ? { ...post } : p))

    savePostByUserId(updatedPostByUserId)
  }

  return { postByUserId, addPost, handleSavePost, handleClickRemoveButton, savePostByUserId }
}

export default usePostList
