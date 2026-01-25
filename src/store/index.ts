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
import wishlistReducer from './wishlist/wishlistSlice'
import authReducer from './auth/authSlice'

const rootPersistConfig = {
  key: 'root',
  storage,
  whitelist: ['cart', 'auth'],
}

const cartPersistConfig = {
  key: 'cartItems',
  storage,
  whitelist: ['items'],
}

const authConfig = {
  key: 'auth',
  storage,
  whitelist: ['accessToken', 'user'],
}

const rootReducer = combineReducers({
  categories: categoriesReducer,
  products: productsReducer,
  cart: persistReducer(cartPersistConfig, cartReducer),
  wishlist: wishlistReducer,
  auth: persistReducer(authConfig, authReducer),
})

const persistedReducer = persistReducer(rootPersistConfig, rootReducer)

const store = configureStore({
  reducer: persistedReducer,
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
