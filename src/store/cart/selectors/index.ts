import { createSelector } from '@reduxjs/toolkit'
import type { RootState } from '../../index'

const getTotalCartQuantitySelector = createSelector(
  (state: RootState) => state.cart.items, // return items
  (items) => {
    console.log('function')
    const totalQuantity = Object.values(items).reduce((acc, currentValue) => {
      return acc + currentValue
    }, 0)
    return totalQuantity
  }
)

export { getTotalCartQuantitySelector }
