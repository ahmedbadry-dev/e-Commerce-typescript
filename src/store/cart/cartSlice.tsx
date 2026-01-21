import { createSlice } from "@reduxjs/toolkit";
import type { TProduct } from "@customTypes/product.type";
import { getCartTotalQuantitySelector } from './selectors'
import getProductsByItems from "./thunk/thunkGetProductsByItems";
import type { TLoading } from "@customTypes/shared.type";



interface ICartState {
    items: { [key: string]: number },
    productsFullInfo: TProduct[]
    loading: TLoading
    error: null | string
}


const initialState: ICartState = {
    items: {},
    productsFullInfo: [],
    loading: 'idle',
    error: null
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const id = action.payload
            if (state.items[id]) {
                state.items[id]++
            } else {
                state.items[id] = 1
            }
        },
        cartItemChangeQuantity: (state, action) => {
            const { id, quantity } = action.payload
            state.items[id] = quantity
        },
        removeCartItem: (state, action) => {
            delete state.items[action.payload.id]
            state.productsFullInfo = state.productsFullInfo.filter(product => (
                product.id !== action.payload.id
            ))
        },
        cartItemsFullInfoCleanUp: (state) => {
            state.productsFullInfo = []
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getProductsByItems.pending, (state) => {
                state.loading = 'pending'
                state.error = null
            })
            .addCase(getProductsByItems.fulfilled, (state, action) => {
                state.loading = 'succeeded'
                state.productsFullInfo = action.payload
            })
            .addCase(getProductsByItems.rejected, (state, action) => {
                state.loading = 'failed'
                if (action.payload && typeof action.payload === "string") {
                    state.error = action.payload
                }
            })
    }
})




export { getCartTotalQuantitySelector, getProductsByItems }
export const { addToCart, cartItemChangeQuantity, removeCartItem, cartItemsFullInfoCleanUp } = cartSlice.actions
export default cartSlice.reducer

