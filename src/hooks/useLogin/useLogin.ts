import { useEffect, useState } from 'react'
import { IUser } from '../../context/LoginContext/LoginContext'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { AccountActions, AccountSelectors, EAccountForm } from '../../modules/Comments/store/reducers/Account.slice'

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
  const dispatch = useAppDispatch()

  // const user = useAppSelector(AccountSelectors.selectUser)
  const currentUser = useAppSelector(AccountSelectors.selectCurrentUser)
  // const openedForm = useAppSelector(AccountSelectors.selectOpenForm)
  const registrationFormForm = useAppSelector(AccountSelectors.selectRegistrationForm)

  // const userList = useAppSelector(AccountSelectors.selectUserList)

  // const isShowSignIn = useAppSelector((state) => state.account.openedForm === EAccountForm.SignIn)
  // const isShowSignUp = useAppSelector((state) => state.account.openedForm === EAccountForm.SignUp)
  // const isShowLoginForm = useAppSelector((state) => state.account.openedForm === EAccountForm.Login)

  // const isShowSignIn = useAppSelector((state) => state.account.openedForm)
  // const isShowSignUp = useAppSelector((state) => state.account.openedForm)
  // const isShowLoginForm = useAppSelector((state) => state.account.openedForm)

  const isShowSignIn = registrationFormForm === EAccountForm.SignIn
  const isShowSignUp = registrationFormForm === EAccountForm.SignUp
  // const isShowLoginForm = openedForm

  // const isShowLoginButton = useAppSelector((state) => state.account.openedForm === EAccountForm.LoginButton)

  // const [isShowSignIn, setIsShowSignIn] = useState(false)
  // const [isShowSignUp, setIsShowSignUp] = useState(false)
  // const [isShowLoginForm, setIsShowLoginForm] = useState(false)
  // const [isShowLoginButton, setIsShowLoginButton] = useState(false)

  const closeLoginForm = () => {
    dispatch(AccountActions.closeLoginForm())
    // setIsShowSignIn(false)
    // setIsShowSignUp(false)
    // setIsShowLoginForm(false)
  }

  useEffect(() => {
    const storedData = getStoredData()

    dispatch(AccountActions.addCurrentUser(storedData.currentUser))
  }, [])

  const addUser = (user: IUser): void => {
    saveUser(user)
    dispatch(AccountActions.closeLoginForm())
    // setIsShowSignIn(false)
    // setIsShowSignUp(false)
    // setIsShowLoginForm(false)
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
    isShowSignIn,
    isShowSignUp,

    // isShowLoginButton,
    // setIsShowSignIn,
    // setIsShowSignUp,
    // setIsShowLoginForm,
    // setIsShowLoginButton,
    addCurrentUser,
    closeLoginForm,
    cleanCurrentUser,
  }
}

export default useLogin
