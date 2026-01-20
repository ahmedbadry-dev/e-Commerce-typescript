import axios from 'axios'
import { createAsyncThunk } from '@reduxjs/toolkit'
import type { RootState } from '../../index'
import type { TProduct } from '@customTypes/product.type'

type TResponse = TProduct[]

const getProductsByItems = createAsyncThunk(
  'cart/getProductsByItems',
  async (_, thunkAPI) => {
    const { rejectWithValue, fulfillWithValue, getState } = thunkAPI
    const { cart } = getState() as RootState
    const itemsId = Object.keys(cart.items)

    if (!itemsId.length) {
      return fulfillWithValue([])
    }
    try {
      const concatenatedItemsId = itemsId
        .map((itemId) => `id=${Number(itemId)}`)
        .join('&')
      const response = await axios.get<TResponse>(
        `/products?${concatenatedItemsId}`
      )
      return response.data
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.request?.data.message)
      } else {
        return rejectWithValue('An unexpected error')
      }
    }
  }
)

export default getProductsByItems
