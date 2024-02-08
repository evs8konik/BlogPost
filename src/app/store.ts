import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import CommentsReducer from '../modules/Comments/store/reducers/Comments.slice'
import AccountReducer from '../modules/Comments/store/reducers/Account.slice'

export const store = configureStore({
  reducer: {
    comments: CommentsReducer,
    account: AccountReducer,
  },
})

export type TAppDispatch = typeof store.dispatch
export type TRootState = ReturnType<typeof store.getState>
export type TAppThunk<ReturnType = void> = ThunkAction<ReturnType, TRootState, unknown, Action<string>>
