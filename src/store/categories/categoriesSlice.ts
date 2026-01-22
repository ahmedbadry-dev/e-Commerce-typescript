import { createSlice } from '@reduxjs/toolkit'
import { isString, type ICategoriesState } from '@types'
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
      .addCase(getCategories.pending, (state) => {
        state.loading = 'pending'
        state.error = null
      })
      .addCase(getCategories.fulfilled, (state, action) => {
        state.loading = 'succeeded'
        state.records = action.payload
      })
      .addCase(getCategories.rejected, (state, action) => {
        state.loading = 'failed'
        if (isString(action.payload)) {
          state.error = action.payload
        }
      })
  },
})

export default categoriesSlice.reducer
