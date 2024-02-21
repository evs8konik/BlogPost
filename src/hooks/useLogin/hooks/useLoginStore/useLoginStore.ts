import { IUser } from '../../../../components/CommentForm/CommentForm'

export interface IStoredData {
  userList: IUser[]
  currentUser: IUser | null
}

const useLoginStore = () => {
  const STORAGE_KEY = 'login'

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

  return {
    STORAGE_KEY,
    getStoredData,
    saveUser,
    saveCurrentUser,
  }
}

export default useLoginStore
