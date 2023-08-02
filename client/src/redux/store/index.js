import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'
import logger from 'redux-logger'
import users from '../reducerSlice/users'
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';

//configuring persist
const persistConfig = {
  key: 'root',
  storage,
}


//combining slice
const reducer = combineReducers({
    users,
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