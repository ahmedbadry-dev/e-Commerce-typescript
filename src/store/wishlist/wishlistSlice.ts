import { createSlice } from '@reduxjs/toolkit'
import thunkLikeToggle from './thunk/thunkLickToggle'
import thunkGetWishlistByProductId from './thunk/thunkGetWishlistByProductId'
import { isString, type TLoading, type TProduct } from '@types'

interface IWishlistState {
  itemsId: number[]
  productsFullInfo: TProduct[]
  error: null | string
  loading: TLoading
}

const initialState: IWishlistState = {
  itemsId: [],
  productsFullInfo: [],
  error: null,
  loading: 'idle',
}

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    wishlistItemsFullInfoCleanUp: (state) => {
      state.productsFullInfo = []
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(thunkLikeToggle.pending, (state, action) => {
        // we do not put the loading hear cose if we do that when click on
        // on product like icon all product icon will display loading state
        // se we will handle it inside the product it self
        if (action.payload && typeof action.payload === 'string') {
          state.error = action.payload
        }
      })
      .addCase(thunkLikeToggle.fulfilled, (state, action) => {
        if (action.payload.type === 'add') {
          state.itemsId.push(action.payload.id)
        } else {
          state.itemsId = state.itemsId.filter(
            (item) => item !== action.payload.id
          )
          state.productsFullInfo = state.productsFullInfo.filter(
            (el) => el.id !== action.payload.id
          )
        }
      })
      .addCase(thunkLikeToggle.rejected, (state, action) => {
        if (action.payload && typeof action.payload === 'string') {
          state.error = action.payload
        }
      })
      // get wishlist items
      .addCase(thunkGetWishlistByProductId.pending, (state) => {
        state.loading = 'pending'
        state.error = null
      })
      .addCase(thunkGetWishlistByProductId.fulfilled, (state, action) => {
        state.loading = 'succeeded'
        state.productsFullInfo = action.payload
      })
      .addCase(thunkGetWishlistByProductId.rejected, (state, action) => {
        state.loading = 'failed'
        if (isString(action.payload)) {
          state.error = action.payload
        }
      })
  },
})

export const { wishlistItemsFullInfoCleanUp } = wishlistSlice.actions
export { thunkLikeToggle, thunkGetWishlistByProductId }
export default wishlistSlice.reducer
