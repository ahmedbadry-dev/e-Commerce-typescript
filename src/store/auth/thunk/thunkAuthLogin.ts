import { createAsyncThunk } from '@reduxjs/toolkit'
import { axiosErrorHandler } from '@utils/axiosErrorHandler'
import axios from 'axios'

type TFormData = {
  email: string
  password: string
}

type TResponse = {
  accessToken: string
  user: {
    id: number
    firstName: string
    lastName: string
    email: string
  }
}

const thunkAuthLogin = createAsyncThunk(
  'auth/thunkAuthLogin',
  async (FormData: TFormData, thunkAPI) => {
    const { rejectWithValue } = thunkAPI

    try {
      const response = await axios.post<TResponse>('/login', FormData)
      return response.data
    } catch (error) {
      return rejectWithValue(axiosErrorHandler(error))
    }
  }
)

export default thunkAuthLogin
