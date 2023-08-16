import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'
import logger from 'redux-logger'
import users from '../reducerSlice/users'
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import products from '../reducerSlice/products';
//configuring persist
const persistConfig = {
  key: 'root',
  storage,
}


//combining slice
const reducer = combineReducers({
    users,
    products,
    //..
  })
  const persistedReducer = persistReducer(persistConfig, reducer)
  //configuring the store
  export const store = configureStore({
    reducer:persistedReducer,
   
    middleware:[logger]
  })

  // export default store;
  export const persistor = persistStore(store)