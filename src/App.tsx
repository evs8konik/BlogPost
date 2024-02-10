import React, { FC, useEffect } from 'react'
import { Routes, Route, Link, useNavigate } from 'react-router-dom'
import LoginPage from './components/LoginPage/LoginPage'
import { EAppRoute } from './routes/AppRoute'
import { useAppSelector } from './app/hooks'
import { AccountSelectors } from './modules/Comments/store/reducers/Account.slice'
import CommentPage from './components/CommentPage/CommentPage'

const App: FC = () => {
  const navigate = useNavigate()
  const currentUser = useAppSelector(AccountSelectors.selectCurrentUser)

  useEffect(() => {
    if (currentUser === null) {
      navigate(EAppRoute.Login)
    }

    if (currentUser !== null) {
      navigate(EAppRoute.Comments)
    }
  }, [currentUser, navigate]) // зависимость useEffect от currentUser и navigate

  return (
    <div className="general-wrapper">
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
