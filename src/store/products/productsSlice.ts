import { createSlice } from '@reduxjs/toolkit'
import { getProductsByPrefix } from './thunk/thunkGatProductsByPrefix'
import { isString, type IProductsState } from '@types'

const initialState: IProductsState = {
  records: [],
  loading: 'idle',
  error: null,
}

const productsSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    productCleanUp: (state) => {
      state.records = []
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProductsByPrefix.pending, (state) => {
        state.loading = 'pending'
        state.error = null
      })
      .addCase(getProductsByPrefix.fulfilled, (state, action) => {
        state.loading = 'succeeded'
        state.records = action.payload
      })
      .addCase(getProductsByPrefix.rejected, (state, action) => {
        state.loading = 'failed'
        if (isString(action.payload)) {
          state.error = action.payload
        }
      })
  },
})

export const { productCleanUp } = productsSlice.actions
export default productsSlice.reducer
