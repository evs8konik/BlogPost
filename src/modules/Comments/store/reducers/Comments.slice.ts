import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { IComment } from '../../../../components/CommentForm/CommentForm'
import { TRootState } from '../../../../app/store'

interface ICommentsReduxState {
  commentsByPostId: {
    [postId: string]: IComment[]
  }
}

const initialState: ICommentsReduxState = {
  commentsByPostId: {},
}

const CommentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    addComment: (state, { payload: { postId, comment } }: PayloadAction<{ postId: string; comment: IComment }>) => {
      if (!state.commentsByPostId[postId]) {
        state.commentsByPostId[postId] = []
      }
      state.commentsByPostId[postId].push(comment)
    },

    deleteComment: (state, { payload }: PayloadAction<{ commentId: string; postId: string }>) => {
      const { commentId, postId } = payload
      if (state.commentsByPostId[postId]) {
        state.commentsByPostId[postId] = state.commentsByPostId[postId].filter((comment) => comment.id !== commentId)
      }
    },

    saveComment: (state, { payload }: PayloadAction<IComment>) => {
      const { postId } = payload
      if (state.commentsByPostId[postId]) {
        state.commentsByPostId[postId] = state.commentsByPostId[postId].map((comment) =>
          comment.id === payload.id ? { ...comment } : comment,
        )
      }
    },

    addCommentsByPostId: (state, { payload }: PayloadAction<{ postId: string; comments: IComment[] }>) => {
      const { postId, comments } = payload
      state.commentsByPostId[postId] = comments
    },
  },
})

export const selectCommentsByPostId = (state: TRootState) => {
  return state.comments.commentsByPostId
}

export const CommentsActions = CommentsSlice.actions

const CommentsReducer = CommentsSlice.reducer

export default CommentsReducer
