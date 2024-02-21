import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { TRootState } from '../../../../app/store'

export enum ENotificationType {
  Error = 'error',
  Success = 'success',
}

export interface INotification {
  id: string
  type: ENotificationType | undefined
  title: string | undefined
}

interface INotificationReduxState {
  notificationList: INotification[]
}

const initialState: INotificationReduxState = {
  notificationList: [],
}

const NotificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    addNotification: (state, { payload }: PayloadAction<INotification>) => {
      state.notificationList.push(payload)
    },

    deleteNotification: (state, { payload }: PayloadAction<string>) => {
      state.notificationList = state.notificationList.filter((notification) => notification.id !== payload)
    },
  },
})

export const NotificationSelectors = {
  selectNotificationList: (state: TRootState) => state.notification.notificationList,
}

export const NotificationActions = NotificationSlice.actions

const NotificationReducer = NotificationSlice.reducer

export default NotificationReducer
