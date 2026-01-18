import { configureStore, combineReducers } from '@reduxjs/toolkit'
import {
  persistStore,
  persistReducer,
  FLUSH,
  REGISTER,
  REHYDRATE,
  PURGE,
  PAUSE,
  PERSIST,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
import categoriesReducer from './categories/categoriesSlice'
import productsReducer from './products/productsSlice'
import cartReducer from './cart/cartSlice'

const cartPersistConfig = {
  key: 'cartItems',
  storage,
  whitelist: ['items'],
}

const rootReducer = combineReducers({
  categories: categoriesReducer,
  products: productsReducer,
  cart: persistReducer(cartPersistConfig, cartReducer),
})

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REGISTER, REHYDRATE, PURGE, PAUSE, PERSIST],
      },
    }),
})

const persistor = persistStore(store)

export { store, persistor }
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
