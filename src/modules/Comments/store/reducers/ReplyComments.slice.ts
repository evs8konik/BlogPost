import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { IReplyComment } from '../../../../components/CommentForm/CommentForm'
import { TRootState } from '../../../../app/store'

interface IReplyCommentsReduxState {
  replyByCommentId: {
    [commentId: string]: IReplyComment[]
  }
}

const initialState: IReplyCommentsReduxState = {
  replyByCommentId: {},
}

const RepliesSlice = createSlice({
  name: 'replyComments',
  initialState,
  reducers: {
    addReply: (
      state,
      { payload: { commentId, reply } }: PayloadAction<{ commentId: string; reply: IReplyComment }>,
    ) => {
      if (!state.replyByCommentId[commentId]) {
        state.replyByCommentId[commentId] = []
      }
      state.replyByCommentId[commentId].push(reply)
    },

    deleteReply: (state, { payload }: PayloadAction<{ replyId: string; commentId: string }>) => {
      const { replyId, commentId } = payload
      if (state.replyByCommentId[commentId]) {
        state.replyByCommentId[commentId] = state.replyByCommentId[commentId].filter((reply) => reply.id !== replyId)
      }
    },

    saveReply: (state, { payload }: PayloadAction<IReplyComment>) => {
      const { commentId } = payload
      if (state.replyByCommentId[commentId]) {
        state.replyByCommentId[commentId] = state.replyByCommentId[commentId].map((reply) =>
          reply.id === payload.id ? { ...reply } : reply,
        )
      }
    },

    addRepliesByCommentId: (state, { payload }: PayloadAction<{ commentId: string; replies: IReplyComment[] }>) => {
      const { commentId, replies } = payload
      state.replyByCommentId[commentId] = replies
    },
  },
})

export const selectReplyByCommentId = (state: TRootState) => {
  return state.replies.replyByCommentId
}

export const RepliesActions = RepliesSlice.actions

const RepliesReducer = RepliesSlice.reducer

export default RepliesReducer
