import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import type { TProduct } from '@customTypes/product.type'

type TResponse = TProduct[]

export const getProductsByPrefix = createAsyncThunk(
  'products/getAll',
  async (prefix: string, { rejectWithValue }) => {
    // await new Promise((resolve) => {
    //   setTimeout(() => {
    //     resolve('done')
    //   }, 2000)
    // })

    try {
      const response = await axios.get<TResponse>(
        `/products?cat_prefix=${prefix}`
      )
      return response.data
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data?.message || error.message)
      }
      return rejectWithValue('An unexpected error')
    }
  }
)
