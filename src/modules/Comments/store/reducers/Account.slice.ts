import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { TRootState } from '../../../../app/store'
import { IUser } from '../../../../components/CommentForm/CommentForm'

export enum EAccountForm {
  SignIn = 'signIn',
  SignUp = 'signUp',
}

interface IAccountReduxState {
  currentUser: IUser | null
  registrationForm: EAccountForm | null
}

const initialState: IAccountReduxState = {
  currentUser: null,
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

    closeLoginForm: (state) => {
      state.registrationForm = null
    },

    addCurrentUser: (state, { payload }: PayloadAction<IUser | null>) => {
      state.currentUser = payload
    },
  },
})

export const AccountSelectors = {
  selectCurrentUser: (state: TRootState) => state.account.currentUser,
  selectRegistrationForm: (state: TRootState) => state.account.registrationForm,
}

export const AccountActions = AccountSlice.actions

const AccountReducer = AccountSlice.reducer

export default AccountReducer
