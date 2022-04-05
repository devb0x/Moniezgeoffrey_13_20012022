import {createSlice} from "@reduxjs/toolkit"

const tokenLocal = localStorage.getItem("token")

const initialAuthState = {
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
    login: function (state, data) {
      state.token = data.payload.token
    },
    setUser: function(state, data) {
      state.firstName = data.payload.body.firstName
      state.lastName = data.payload.body.lastName
      state.id = data.payload.body.id
      state.email = data.payload.body.email
    },
    logout: function(state) {
      localStorage.removeItem("token")
      return initialAuthState
    },
    // not used
    updateUser: function(state, data) {
      state.firstName = data.payload.body.firstName
      state.lastName = data.payload.body.lastName
    }
  }
})

export const authActions = authSlice.actions

export default authSlice.reducer
