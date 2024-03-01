import React, { FC, useEffect } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import LoginPage from './components/LoginPage/LoginPage'
import { EAppRoute } from './routes/AppRoute'
import { useAppSelector } from './app/hooks'
import { AccountSelectors } from './modules/Comments/store/reducers/Account.slice'
import CommentPage from './components/CommentPage/CommentPage'
import Notification from './containers/Notification/Notification'
import useNotification from './hooks/useNotification/useNotification'
import Styles from './App.styled'

const App: FC = () => {
  const navigate = useNavigate()
  const currentUser = useAppSelector(AccountSelectors.selectCurrentUser)

  const { handleClickDeleteNotification, notificationList } = useNotification()

  useEffect(() => {
    if (currentUser === null) {
      navigate(EAppRoute.Login)
    }

    if (currentUser !== null) {
      navigate(EAppRoute.Comments)
    }
  }, [currentUser])

  return (
    <div className="general-wrapper">
      <div className="notification">
        {notificationList.map((notification) => (
          <Notification
            key={notification.id}
            notification={notification}
            onClick={handleClickDeleteNotification}
            {...notification}
          />
        ))}
      </div>

      <Routes>
        <Route
          path={EAppRoute.Comments}
          element={<CommentPage />}
        />

        <Route
          path={EAppRoute.Login}
          element={<LoginPage />}
        />
      </Routes>
    </div>
  )
}

export default App
