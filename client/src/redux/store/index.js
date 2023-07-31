import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'
import logger from 'redux-logger'
import users from '../reducerSlice/users'

//combining slice
const reducer = combineReducers({
    users,
    //..
  })
  //configuring the store
  const store = configureStore({
    reducer,
    middleware:[logger]
  })

  export default store;