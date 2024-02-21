import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import CommentsReducer from '../modules/Comments/store/reducers/Comments.slice'
import AccountReducer from '../modules/Comments/store/reducers/Account.slice'
import NotificationReducer from '../modules/Comments/store/reducers/Notification.slice'

export const store = configureStore({
  reducer: {
    comments: CommentsReducer,
    account: AccountReducer,
    notification: NotificationReducer,
  },
})

export type TAppDispatch = typeof store.dispatch
export type TRootState = ReturnType<typeof store.getState>
export type TAppThunk<ReturnType = void> = ThunkAction<ReturnType, TRootState, unknown, Action<string>>
