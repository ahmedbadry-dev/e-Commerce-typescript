import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import type { TCategory } from '@customTypes/categories.type'

type TResponse = TCategory

export const getCategories = createAsyncThunk(
  'categories/getAll',
  async (_, { rejectWithValue }) => {
    // await new Promise((resolve) => {
    //   setTimeout(() => {
    //     resolve('done')
    //   }, 2000)
    // })
    try {
      const response = await axios.get<TResponse[]>('/categories')
      return response.data
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data?.message || error.message)
      }
      return rejectWithValue('An unexpected error')
    }
  }
)
