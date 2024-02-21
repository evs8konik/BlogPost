import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { AccountActions, AccountSelectors, EAccountForm } from '../../modules/Comments/store/reducers/Account.slice'
import { IUser } from '../../components/CommentForm/CommentForm'
import useLoginStore from './hooks/useLoginStore/useLoginStore'

// const STORAGE_KEY = 'login'

// interface IStoredData {
//   userList: IUser[]
//   currentUser: IUser | null
// }

// const getStoredData = (): IStoredData => {
//   const storedData = localStorage.getItem(STORAGE_KEY)

//   if (!storedData) return { userList: [], currentUser: null }

//   return JSON.parse(storedData) as IStoredData
// }

// const saveUser = (user: IUser): void => {
//   const storedData = getStoredData()

//   const formattedStoreData = JSON.stringify({
//     ...storedData,
//     userList: [...storedData.userList, user],
//   })

//   localStorage.setItem(STORAGE_KEY, formattedStoreData)
// }

// const saveCurrentUser = (currentUser: IUser | null): void => {
//   const storedData = getStoredData()

//   const formattedStoreData = JSON.stringify({
//     ...storedData,
//     currentUser: currentUser,
//   })

//   localStorage.setItem(STORAGE_KEY, formattedStoreData)
// }

const useLogin = () => {
  const { STORAGE_KEY, getStoredData, saveUser, saveCurrentUser } = useLoginStore()

  const dispatch = useAppDispatch()

  const currentUser = useAppSelector(AccountSelectors.selectCurrentUser)

  const closeLoginForm = () => {
    dispatch(AccountActions.closeLoginForm())
  }

  useEffect(() => {
    const storedData = getStoredData()

    dispatch(AccountActions.addCurrentUser(storedData.currentUser))
  }, [])

  const addUser = (user: IUser): void => {
    saveUser(user)
    dispatch(AccountActions.closeLoginForm())
  }

  const addCurrentUser = (currentUser: IUser | null): void => {
    dispatch(AccountActions.addCurrentUser(currentUser))

    saveCurrentUser(currentUser)
  }

  const cleanCurrentUser = (): void => {
    setTimeout(() => {
      saveCurrentUser(null)

      dispatch(AccountActions.addCurrentUser(null))
    }, 0)
  }

  const getUser = (email: string, password: string): IUser | null => {
    const { userList } = getStoredData()

    const foundUser = userList.find((user) => {
      return user.email === email && user.password === password
    })

    if (foundUser) return foundUser
    else return null
  }

  return {
    currentUser,
    addUser,
    getUser,
    addCurrentUser,
    closeLoginForm,
    cleanCurrentUser,
  }
}

export default useLogin
