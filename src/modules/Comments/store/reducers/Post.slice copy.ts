import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { IPost } from '../../../common/models/Post/Post'
import { TRootState } from '../../../../app/store'

interface IPostReduxState {
  postByUserId: {
    [userId: string]: IPost[]
  }
}

const initialState: IPostReduxState = {
  postByUserId: {},
}

const PostSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    addPost: (state, { payload: { userId, post } }: PayloadAction<{ userId: string; post: IPost }>) => {
      if (!state.postByUserId[userId]) {
        state.postByUserId[userId] = []
      }
      state.postByUserId[userId].push(post)
    },

    deletePost: (state, { payload }: PayloadAction<{ postId: string; userId: string }>) => {
      const { postId, userId } = payload
      if (state.postByUserId[userId]) {
        state.postByUserId[userId] = state.postByUserId[userId].filter((post) => post.id !== postId)
      }
    },

    savePost: (state, { payload }: PayloadAction<IPost>) => {
      const { userId } = payload
      if (state.postByUserId[userId]) {
        state.postByUserId[userId] = state.postByUserId[userId].map((post) =>
          post.id === payload.id ? { ...post } : post,
        )
      }
    },

    addPostsByUserId: (state, { payload }: PayloadAction<{ userId: string; posts: IPost[] }>) => {
      const { userId, posts } = payload
      state.postByUserId[userId] = posts
    },
  },
})

export const selectPostByUserId = (state: TRootState) => state.posts.postByUserId

export const PostsActions = PostSlice.actions

const PostsReducer = PostSlice.reducer

export default PostsReducer
