import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import CommentsReducer from '../modules/Comments/store/redusers/Comments.slice'

export const store = configureStore({
  reducer: {
    comments: CommentsReducer,
  },
})

export type TAppDispatch = typeof store.dispatch
export type TRootState = ReturnType<typeof store.getState>
export type TAppThunk<ReturnType = void> = ThunkAction<ReturnType, TRootState, unknown, Action<string>>
