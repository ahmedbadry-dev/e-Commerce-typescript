import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import type { TProduct } from '@types'
import { axiosErrorHandler } from '@utils'

type TResponse = TProduct[]

export const getProductsByPrefix = createAsyncThunk(
  'products/getAll',
  async (prefix: string, thunkAPI) => {
    const { rejectWithValue, signal } = thunkAPI
    // await new Promise((resolve) => {
    //   setTimeout(() => {
    //     resolve('done')
    //   }, 2000)
    // })

    try {
      const response = await axios.get<TResponse>(
        `/products?cat_prefix=${prefix}`,
        { signal }
      )
      return response.data
    } catch (error) {
      return rejectWithValue(axiosErrorHandler(error))
    }
  }
)
