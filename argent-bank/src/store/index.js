import {configureStore} from "@reduxjs/toolkit"

import authReducer from './authSlice'
import errorReducer from './error/errorSlice'

const store = configureStore({
  reducer: {
    authentication: authReducer,
    error: errorReducer
  }
})

export default store