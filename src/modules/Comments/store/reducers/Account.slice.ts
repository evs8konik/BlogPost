import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { IUser } from '../../../../context/LoginContext/LoginContext'
import { TRootState } from '../../../../app/store'

export enum EAccountForm {
  SignIn = 'signIn',
  SignUp = 'signUp',
  Login = 'login',
  // LoginButton = 'loginButton',
}

interface IAccountReduxState {
  // userList: IUser[]
  // user: IUser | null
  currentUser: IUser | null
  // isOpenedForm: true | false
  registrationForm: EAccountForm | null
}

const initialState: IAccountReduxState = {
  // userList: [],
  // user: null,
  currentUser: null,
  // isOpenedForm: false,
  registrationForm: null,
}

const AccountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {
    showSignInForm: (state) => {
      state.registrationForm = EAccountForm.SignIn
    },

    showSignUpForm: (state) => {
      state.registrationForm = EAccountForm.SignUp
    },

    // showLoginForm: (state) => {
    //   state.openedForm = true
    // },

    closeLoginForm: (state) => {
      // state.openedForm = false
      state.registrationForm = null
    },

    // showLoginButton: (state) => {
    //   state.openedForm = EAccountForm.LoginButton
    // },

    addCurrentUser: (state, { payload }: PayloadAction<IUser | null>) => {
      state.currentUser = payload
    },
  },
})

export const AccountSelectors = {
  selectCurrentUser: (state: TRootState) => state.account.currentUser,
  // selectOpenForm: (state: TRootState) => state.account.openedForm,
  // selectUser: (state: TRootState) => state.account.user,
  // selectUserList: (state: TRootState) => state.account.userList,
  selectRegistrationForm: (state: TRootState) => state.account.registrationForm,
}

export const AccountActions = AccountSlice.actions

const AccountReducer = AccountSlice.reducer

export default AccountReducer
