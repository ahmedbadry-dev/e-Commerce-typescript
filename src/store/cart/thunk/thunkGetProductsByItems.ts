import axios from 'axios'
import { axiosErrorHandler } from '@utils'
import { createAsyncThunk } from '@reduxjs/toolkit'
import type { RootState } from '@store'
import type { TProduct } from '@types'

type TResponse = TProduct[]

const getProductsByItems = createAsyncThunk(
  'cart/getProductsByItems',
  async (_, thunkAPI) => {
    const { rejectWithValue, fulfillWithValue, getState, signal } = thunkAPI
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
        `/products?${concatenatedItemsId}`,
        { signal }
      )
      return response.data
    } catch (error) {
      return rejectWithValue(axiosErrorHandler(error))
    }
  }
)

export default getProductsByItems
