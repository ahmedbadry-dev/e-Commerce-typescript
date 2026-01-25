import { createSlice } from '@reduxjs/toolkit'
import { isString, type TLoading } from '@types'
import thunkAuthRegister from './thunk/thunkAuthRegister'
import thunkAuthLogin from './thunk/thunkAuthLogin'

interface IAuthState {
  user: {
    id: number
    email: string
    firstName: string
    lastName: string
  } | null
  accessToken: string | null
  loading: TLoading
  error: null | string
}

const initialState: IAuthState = {
  user: null,
  accessToken: null,
  loading: 'idle',
  error: null,
}
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    resetUI: (state) => {
      state.loading = 'idle'
      state.error = null
    },
    authLogout: (state) => {
      state.accessToken = null
      state.user = null
    },
  },
  extraReducers: (builder) => {
    builder
      //Register
      .addCase(thunkAuthRegister.pending, (state) => {
        state.loading = 'pending'
        state.error = null
      })
      .addCase(thunkAuthRegister.fulfilled, (state) => {
        state.loading = 'succeeded'
      })
      .addCase(thunkAuthRegister.rejected, (state, action) => {
        state.loading = 'failed'
        if (isString(action.payload)) {
          state.error = action.payload
        }
      })
      // Login
      .addCase(thunkAuthLogin.pending, (state) => {
        state.loading = 'pending'
        state.error = null
      })
      .addCase(thunkAuthLogin.fulfilled, (state, action) => {
        state.loading = 'succeeded'
        state.accessToken = action.payload.accessToken
        state.user = action.payload.user
      })
      .addCase(thunkAuthLogin.rejected, (state, action) => {
        state.loading = 'failed'
        if (isString(action.payload)) {
          state.error = action.payload
        }
      })
  },
})

export { thunkAuthRegister, thunkAuthLogin }
export const { resetUI, authLogout } = authSlice.actions
export default authSlice.reducer
