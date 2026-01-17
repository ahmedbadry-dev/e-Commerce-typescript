import {
  createSlice,
  isFulfilled,
  isPending,
  isRejectedWithValue,
} from '@reduxjs/toolkit'
import type { ICategoriesState } from '@customTypes/categories.type'
import { getCategories } from './thunk/thunkGatCategories'

const initialState: ICategoriesState = {
  records: [],
  loading: 'idle',
  error: null,
}

const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCategories.fulfilled, (state, action) => {
        state.records = action.payload
      })
      .addMatcher(isRejectedWithValue, (state, action) => {
        state.loading = 'failed'
        if (action.payload && typeof action.payload === 'string') {
          state.error = action.payload
        }
        // state.error = action.payload as string
      })
      .addMatcher(isFulfilled, (state) => {
        state.loading = 'succeeded'
      })
      .addMatcher(isPending, (state) => {
        state.loading = 'pending'
        state.error = null
      })
  },
})

export default categoriesSlice.reducer
