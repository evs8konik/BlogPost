import { createContext, useContext } from 'react'

export interface ILoginState {
  user: IUser | null
  currentUser: IUser | null
  isShowSignIn: boolean
  isShowSignUp: boolean
  isShowLoginForm: boolean
  setUser: (user: IUser | null) => void
  setCurrentUser: (currentUser: IUser | null) => void
  setIsShowSignIn: (value: boolean) => void
  setIsShowSignUp: (value: boolean) => void
  setIsShowLoginForm: (value: boolean) => void
}

export interface IUser {
  firstName: string
  lastName: string
  email: string
  password: string
}

const initialState: ILoginState = {
  user: null,
  currentUser: null,
  isShowSignIn: false,
  isShowSignUp: false,
  isShowLoginForm: false,
  setUser: () => null,
  setCurrentUser: () => null,
  setIsShowSignIn: () => null,
  setIsShowSignUp: () => null,
  setIsShowLoginForm: () => null,
}

const LoginContext = createContext<ILoginState>(initialState)

export const useLoginContext = () => {
  const context = useContext(LoginContext)

  return context
}

console.log('LOGIN_CONTEXT', initialState)

export default LoginContext
