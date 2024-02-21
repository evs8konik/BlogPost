import { useDispatch } from 'react-redux'
import {
  INotification,
  NotificationActions,
  NotificationSelectors,
} from '../../modules/Comments/store/reducers/Notification.slice'
import { useAppSelector } from '../../app/hooks'

const useNotification = () => {
  const dispatch = useDispatch()

  const notificationList = useAppSelector(NotificationSelectors.selectNotificationList)

  const addNotification = (notification: INotification): void => {
    dispatch(NotificationActions.addNotification(notification))
  }

  const handleClickDeleteNotification = (notificationId: string): void => {
    dispatch(NotificationActions.deleteNotification(notificationId))
  }

  return {
    handleClickDeleteNotification,
    addNotification,
    notificationList,
  }
}

export default useNotification
