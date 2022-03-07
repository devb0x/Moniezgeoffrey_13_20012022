import {createSlice} from "@reduxjs/toolkit"

const tokenLocal = localStorage.getItem("token")

const initialAuthState = {
  // isAuth: false,
  token: tokenLocal,
  firstName: '',
  lastName: '',
  email: '',
  id: null
}

const authSlice = createSlice({
  name: 'authentication',
  initialState: initialAuthState,
  reducers: {
    //login method
    login: function (state, data) {
      console.log('login slice')
      // state.isAuth = true
      state.token = data.payload.token
    },

    //setUser method
    setUser: function(state, data) {
      // state.isAuth = true
      // state.token = state.token
      state.firstName = data.payload.body.firstName
      state.lastName = data.payload.body.lastName
      state.id = data.payload.body.id
      state.email = data.payload.body.email
    },

    //logout method
    logout: function(state) {
      localStorage.removeItem("token")
      // tokenLocal = null
      return initialAuthState
    },

    // not used
    updateUser: function(state, data) {
      // console.log(data.payload)
      // state.firstName = data.payload.firstName
      // state.lastName = data.payload.lastName
      state.firstName = data.payload.body.firstName
      state.lastName = data.payload.body.lastName
    }
  }
})

export const authActions = authSlice.actions

export default authSlice.reducer
