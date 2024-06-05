import { createContext, useContext } from 'react'
import { IUser } from '../../../interfaces/User'

export interface ILoginState {
  currentUser: IUser | null
  isShowSignIn: boolean
  isShowSignUp: boolean
  isShowLoginForm: boolean

  // isShowSignIn: EAccountForm | null
  // isShowSignUp: EAccountForm | null
  // isShowLoginForm: EAccountForm | null

  // setIsShowSignIn: (value: boolean) => void
  // setIsShowSignUp: (value: boolean) => void
  // setIsShowLoginForm: (value: boolean) => void
}

// export interface IUser {
//   firstName: string
//   lastName: string
//   email: string
//   password: string
// }

const initialState: ILoginState = {
  currentUser: null,

  isShowSignIn: false,
  isShowSignUp: false,
  isShowLoginForm: false,

  // isShowSignIn: null,
  // isShowSignUp: null,
  // isShowLoginForm: null,

  // setIsShowSignIn: () => null,
  // setIsShowSignUp: () => null,
  // setIsShowLoginForm: () => null,
}

const LoginContext = createContext<ILoginState>(initialState)

export const useLoginContext = () => {
  const context = useContext(LoginContext)

  return context
}

console.log('LOGIN_CONTEXT', initialState)

export default LoginContext
