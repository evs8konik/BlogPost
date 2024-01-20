import { FormEvent, useEffect, useState } from 'react'
import { IUser, useLoginContext } from '../../context/LoginContext/LoginContext'

const STORAGE_KEY = 'login'

interface IStoredData {
  userList: IUser[]
  currentUser: IUser | null
}

const getStoredData = (): IStoredData => {
  const storedData = localStorage.getItem(STORAGE_KEY)

  if (!storedData) return { userList: [], currentUser: null }

  return JSON.parse(storedData) as IStoredData
}

const saveUser = (user: IUser): void => {
  const storedData = getStoredData()

  const formattedStoreData = JSON.stringify({
    ...storedData,
    userList: [...storedData.userList, user],
  })

  localStorage.setItem(STORAGE_KEY, formattedStoreData)
}

const saveCurrentUser = (currentUser: IUser | null): void => {
  const storedData = getStoredData()

  const formattedStoreData = JSON.stringify({
    ...storedData,
    currentUser: currentUser,
  })

  localStorage.setItem(STORAGE_KEY, formattedStoreData)
}

const useLogin = () => {
  const [user, setUser] = useState<IUser | null>(null)
  const [currentUser, setCurrentUser] = useState<IUser | null>(null)

  const [isShowSignIn, setIsShowSignIn] = useState(false)
  const [isShowSignUp, setIsShowSignUp] = useState(false)
  const [isShowLoginForm, setIsShowLoginForm] = useState(false)
  const [isShowLoginButton, setIsShowLoginButton] = useState(false)

  const closeLoginForm = () => {
    setIsShowSignIn(false)
    setIsShowSignUp(false)
    setIsShowLoginForm(false)
  }

  useEffect(() => {
    const storedData = getStoredData()
    setCurrentUser(storedData.currentUser)
  }, [])

  const addUser = (user: IUser): void => {
    saveUser(user)
    setIsShowSignIn(false)
    setIsShowSignUp(false)
    setIsShowLoginForm(false)
  }

  const addCurrentUser = (currentUser: IUser | null): void => {
    saveCurrentUser(currentUser)
  }

  const cleanCurrentUser = (): void => {
    setTimeout(() => {
      const currentUser = null
      saveCurrentUser(currentUser)
      setCurrentUser(currentUser)
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
    user,
    currentUser,
    setCurrentUser,
    setUser,
    addUser,
    getUser,
    isShowSignIn,
    isShowSignUp,
    isShowLoginForm,
    isShowLoginButton,
    setIsShowSignIn,
    setIsShowSignUp,
    setIsShowLoginForm,
    setIsShowLoginButton,
    addCurrentUser,
    closeLoginForm,
    cleanCurrentUser,
  }
}

export default useLogin
