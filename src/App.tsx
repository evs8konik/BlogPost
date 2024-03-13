import React, { FC, useEffect } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import LoginPage from './components/LoginPage/LoginPage'
import { EAppRoute } from './routes/AppRoute'
import { useAppSelector } from './app/hooks'
import { AccountSelectors } from './modules/Comments/store/reducers/Account.slice'
import CommentPage from './components/CommentPage/CommentPage'
import Notification from './containers/Notification/Notification'
import useNotification from './hooks/useNotification/useNotification'
import Styled from './App.styled'
import Filters from './modules/common/features/Filters/Filters'

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
    <Styled.GeneralWrapper>
      <Styled.Notification>
        {notificationList.map((notification) => (
          <Notification
            key={notification.id}
            notification={notification}
            onClick={handleClickDeleteNotification}
            {...notification}
          />
        ))}
      </Styled.Notification>

      <Routes>
        <Route
          path={EAppRoute.Comments}
          element={<CommentPage />}
        />

        <Route
          path={EAppRoute.Login}
          element={<LoginPage />}
        />

        {/* <Route
          path={EAppRoute.Filter}
          element={<Posts />}
        /> */}
      </Routes>

      {/* <Filters></Filters> */}
    </Styled.GeneralWrapper>
  )
}

export default App
