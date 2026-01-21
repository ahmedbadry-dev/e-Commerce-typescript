import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import type { TProduct } from "@customTypes/product.type";

type TResponse = TProduct[]
type TWishlistRecord = {
    id: number;
    userId: string;
    productId: number;
};
const thunkGetWishlistByProductId = createAsyncThunk(
    'wishlist/getWishlistByProductId',
    async (_, thunkAPI) => {
        const { rejectWithValue, fulfillWithValue } = thunkAPI

        try {
            const userWishlist = await axios.get<TWishlistRecord[]>('/wishlist?userId=1')

            if (!userWishlist.data.length) {
                return fulfillWithValue([])
            }

            const concatenatedWishlistId = userWishlist.data.map(el => `id=${el.productId}`).join('&')
            const response = await axios.get<TResponse>(`/products?${concatenatedWishlistId}`)
            return response.data
        } catch (error) {
            if (axios.isAxiosError(error)) {
                return rejectWithValue(error.response?.data.message || error.message)
            } else {
                return rejectWithValue('An unexpected error')
            }
        }

    })


export default thunkGetWishlistByProductId