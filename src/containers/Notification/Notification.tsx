import React, { FC } from 'react'
import ErrorNotify from './components/ErrorNotify/ErrorNotify'
import SuccessNotify from './components/SuccessNotify/SuccessNotify'
import { ENotificationType, INotification } from '../../modules/store/reducers/Notification.slice'

interface IProps {
  notification: INotification
  onClick: (id: string) => void
}

const Notification: FC<IProps> = ({ notification, onClick }) => {
  switch (notification.type) {
    case ENotificationType.Error:
      return (
        <ErrorNotify
          title={notification.title}
          onClick={() => onClick(notification.id)}
        />
      )

    case ENotificationType.Success:
      return (
        <SuccessNotify
          title={notification.title}
          onClick={() => onClick(notification.id)}
        />
      )

    default:
      return null
  }
}

export default Notification
