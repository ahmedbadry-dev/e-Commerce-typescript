import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import type { TCategory } from '@types'
import { axiosErrorHandler } from '@utils'

type TResponse = TCategory[]

export const getCategories = createAsyncThunk(
  'categories/getAll',
  async (_, thunkAPI) => {
    const { rejectWithValue, signal } = thunkAPI
    // await new Promise((resolve) => {
    //   setTimeout(() => {
    //     resolve('done')
    //   }, 2000)
    // })
    try {
      const response = await axios.get<TResponse>('/categories', { signal })
      return response.data
    } catch (error) {
      return rejectWithValue(axiosErrorHandler(error))
    }
  }
)
