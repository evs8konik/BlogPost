import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import CommentsReducer from '../modules/Comments/store/reducers/Comments.slice'
import AccountReducer from '../modules/Comments/store/reducers/Account.slice'
import NotificationReducer from '../modules/Comments/store/reducers/Notification.slice'
import PostsReducer from '../modules/Comments/store/reducers/Post.slice'
import RepliesReducer from '../modules/Comments/store/reducers/ReplyComments.slice'

export const store = configureStore({
  reducer: {
    comments: CommentsReducer,
    posts: PostsReducer,
    account: AccountReducer,
    notification: NotificationReducer,
    replies: RepliesReducer,
  },
})

export type TAppDispatch = typeof store.dispatch
export type TRootState = ReturnType<typeof store.getState>
export type TAppThunk<ReturnType = void> = ThunkAction<ReturnType, TRootState, unknown, Action<string>>
