import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import type { TCategory } from '@customTypes/categories.type'

type TResponse = TCategory

export const getCategories = createAsyncThunk(
  'categories/getAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get<TResponse[]>(
        'http://localhost:5005/categories'
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
