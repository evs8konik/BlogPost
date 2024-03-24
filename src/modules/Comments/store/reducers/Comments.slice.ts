import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { IComment, IReplyComment } from '../../../../components/CommentForm/CommentForm'
import { TRootState } from '../../../../app/store'

interface ICommentsReduxState {
  commentList: IComment[]
  commentsByPostId: {
    [postId: string]: IComment[]
  }
}

const initialState: ICommentsReduxState = {
  commentList: [],
  commentsByPostId: {},
}

const CommentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    addComment: (state, { payload }: PayloadAction<{ postId: string; comment: IComment }>) => {
      const { postId, comment } = payload
      if (!state.commentsByPostId[postId]) {
        state.commentsByPostId[postId] = []
      }
      state.commentsByPostId[postId].push(comment)
    },

    deleteComment: (state, { payload }: PayloadAction<string>) => {
      state.commentList = state.commentList.filter((comment) => comment.id !== payload)
    },

    saveComment: (state, { payload }: PayloadAction<IComment>) => {
      state.commentList = state.commentList.map((comment) => {
        if (comment.id === payload.id) {
          return { ...comment, ...payload }
        }

        return comment
      })
    },

    // addReplyComment: (
    //   state,
    //   { payload: { commentId, reply } }: PayloadAction<{ commentId: string; reply: IReplyComment }>,
    // ) => {
    //   state.commentList = state.commentList.map((comment) => {
    //     if (comment.id !== commentId) return comment

    //     return { ...comment, replyCommentList: [...comment.replyCommentList, reply] }
    //   })
    // },

    // deleteReplyComment: (
    //   state,
    //   { payload: { commentId, replyCommentId } }: PayloadAction<{ commentId: string; replyCommentId: string }>,
    // ) => {
    //   state.commentList = state.commentList.map((comment) => {
    //     if (comment.id !== commentId) return comment

    //     return {
    //       ...comment,
    //       replyCommentList: [...comment.replyCommentList.filter((reply) => reply.id !== replyCommentId)],
    //     }
    //   })
    // },

    // saveReplyComment: (
    //   state,
    //   {
    //     payload: { commentId, replyCommentId, replyComment },
    //   }: PayloadAction<{ commentId: string; replyCommentId: string; replyComment: IReplyComment }>,
    // ) => {
    //   state.commentList = state.commentList.map((comment) => {
    //     if (comment.id !== commentId) return comment

    //     return {
    //       ...comment,
    //       replyCommentList: [
    //         ...comment.replyCommentList.map((reply) => {
    //           if (reply.id === replyCommentId) {
    //             return {
    //               ...(reply = replyComment),
    //             }
    //           }
    //           return reply
    //         }),
    //       ],
    //     }
    //   })
    // },

    addCommentList: (state, { payload }: PayloadAction<IComment[]>) => {
      state.commentList = payload
    },
  },
})

export const selectCommentList = (state: TRootState) => {
  return state.comments.commentList
}

export const selectCommentsByPostId = (state: TRootState) => {
  return state.comments.commentsByPostId
}

export const CommentsActions = CommentsSlice.actions

const CommentsReducer = CommentsSlice.reducer

export default CommentsReducer
