import {createSlice} from "@reduxjs/toolkit"

const initialErrorState = {
  openDialog: false,
  message: '',
  title: ''
}

const errorSlice = createSlice({
  name: 'error',
  initialState: initialErrorState,
  reducers: {
    showError: function (state, action) {
      const { message } = action.payload
      state.message = message
    },
    clearError: function (state) {
      state.openDialog = false
      state.message = ''
    }
  }
})

export const errorActions = errorSlice.actions

export default errorSlice.reducer