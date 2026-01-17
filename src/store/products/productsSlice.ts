import {
  createSlice,
  isFulfilled,
  isPending,
  isRejectedWithValue,
} from '@reduxjs/toolkit'
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
      .addCase(getProductsByPrefix.fulfilled, (state, action) => {
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

export const { productCleanUp } = productsSlice.actions
export default productsSlice.reducer
