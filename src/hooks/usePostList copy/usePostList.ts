import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { IPost } from '../../interfaces/Post'
import { PostsActions, fetchPosts, selectPostByUserId } from '../../modules/store/reducers/Post.slice'

const STORAGE_KEY = 'postByUserId'

interface IStoredPostList {
  postByUserId: {
    [userId: string]: IPost[]
  }
}

const getStoredPostList = (): IStoredPostList => {
  const storedData = localStorage.getItem(STORAGE_KEY)

  if (!storedData) return { postByUserId: {} }

  return JSON.parse(storedData) as IStoredPostList
}

const savePostByUserId = (updatedPosts: { [userId: string]: IPost[] }): void => {
  const storedData = getStoredPostList()
  const updatedPostByUserId = {
    ...storedData.postByUserId,
    ...updatedPosts,
  }
  const formattedStoreData = JSON.stringify({ postByUserId: updatedPostByUserId })
  localStorage.setItem(STORAGE_KEY, formattedStoreData)
}

const deletePostByUserId = (userId: string, postId: string): void => {
  const storedData = getStoredPostList()
  const updatedPostByUserId = {
    ...storedData.postByUserId,
    [userId]: storedData.postByUserId[userId].filter((post) => post.id !== postId),
  }
  const formattedStoreData = JSON.stringify({ postByUserId: updatedPostByUserId })
  localStorage.setItem(STORAGE_KEY, formattedStoreData)
}

const usePostList = () => {
  const dispatch = useAppDispatch()
  const postByUserId = useAppSelector(selectPostByUserId)

  useEffect(() => {
    const storedPostByUserId = getStoredPostList()

    if (Object.keys(storedPostByUserId.postByUserId).length > 0) {
      for (const userId in storedPostByUserId.postByUserId) {
        const payload = {
          userId,
          posts: storedPostByUserId.postByUserId[userId],
        }
        dispatch(PostsActions.addPostsByUserId(payload))
      }
    }

    dispatch(fetchPosts())
  }, [])

  const addPost = (userId: string, post: IPost): void => {
    const storedData = getStoredPostList()
    const updatedPosts = [...(storedData.postByUserId[userId] || []), post]
    const updatedPostByUserId = {
      ...storedData.postByUserId,
      [userId]: updatedPosts,
    }
    savePostByUserId(updatedPostByUserId)
    dispatch(PostsActions.addPost({ userId, post }))
  }

  const handleClickRemoveButton = (userId: string, postId: string): void => {
    dispatch(PostsActions.deletePost({ postId, userId }))
    deletePostByUserId(userId, postId)
  }

  const handleSavePost = (userId: string, post: IPost): void => {
    dispatch(PostsActions.savePost(post))

    const updatedPostsByUserId = { ...postByUserId }

    if (updatedPostsByUserId[userId]) {
      const updatedPosts = updatedPostsByUserId[userId].map((p) => (p.id === post.id ? { ...post } : p))

      updatedPostsByUserId[userId] = updatedPosts
      savePostByUserId({ [userId]: updatedPosts })
    }
  }

  return { postByUserId, addPost, handleSavePost, handleClickRemoveButton }
}

export default usePostList
