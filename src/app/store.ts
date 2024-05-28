import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import CommentsReducer from '../modules/store/reducers/Comments.slice'
import AccountReducer from '../modules/store/reducers/Account.slice'
import NotificationReducer from '../modules/store/reducers/Notification.slice'
import PostsReducer from '../modules/store/reducers/Post.slice'
import RepliesReducer from '../modules/store/reducers/ReplyComments.slice'
import FiltersReducer from '../modules/store/reducers/FiltersState.slice'

export const store = configureStore({
  reducer: {
    comments: CommentsReducer,
    posts: PostsReducer,
    account: AccountReducer,
    notification: NotificationReducer,
    replies: RepliesReducer,
    filters: FiltersReducer,
  },
})

export type TAppDispatch = typeof store.dispatch
export type TRootState = ReturnType<typeof store.getState>
export type TAppThunk<ReturnType = void> = ThunkAction<ReturnType, TRootState, unknown, Action<string>>
