import { createSlice } from '@reduxjs/toolkit'
import type { IProductsState } from '@customTypes/product.type'
import { getProductsByPrefix } from './thunk/thunkGatProductsByPrefix'

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
        if (action.payload && typeof action.payload === 'string') {
          state.error = action.payload
        }
      })
  },
})

export const { productCleanUp } = productsSlice.actions
export default productsSlice.reducer
