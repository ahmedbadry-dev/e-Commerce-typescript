import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import type { TProduct } from "@types";
import { axiosErrorHandler } from "@utils";

type TResponse = TProduct[]
type TWishlistRecord = {
    id: number;
    userId: string;
    productId: number;
};
const thunkGetWishlistByProductId = createAsyncThunk(
    'wishlist/getWishlistByProductId',
    async (_, thunkAPI) => {
        const { rejectWithValue, fulfillWithValue, signal } = thunkAPI

        try {
            const userWishlist = await axios.get<TWishlistRecord[]>('/wishlist?userId=1', { signal })

            if (!userWishlist.data.length) {
                return fulfillWithValue([])
            }

            const concatenatedWishlistId = userWishlist.data.map(el => `id=${el.productId}`).join('&')
            const response = await axios.get<TResponse>(`/products?${concatenatedWishlistId}`)
            return response.data
        } catch (error) {
            return rejectWithValue(axiosErrorHandler(error))
        }

    })


export default thunkGetWishlistByProductId