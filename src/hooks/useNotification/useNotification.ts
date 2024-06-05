import { useDispatch } from 'react-redux'
import {
  INotification,
  NotificationActions,
  NotificationSelectors,
} from '../../modules/store/reducers/Notification.slice'
import { useAppSelector } from '../../app/hooks'

const useNotification = () => {
  const dispatch = useDispatch()

  const notificationList = useAppSelector(NotificationSelectors.selectNotificationList)

  const addNotification = (notification: INotification): void => {
    dispatch(NotificationActions.addNotification(notification))

    setTimeout(() => {
      dispatch(NotificationActions.deleteNotification(notification.id))
    }, 3000)
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
