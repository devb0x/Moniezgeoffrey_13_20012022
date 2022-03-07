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
    //display error
    showError: function (state, action) {
      const { message } = action.payload
      state.message = message
    },
    //remove error
    clearError: function (state) {
      state.openDialog = false
      state.message = ''
    }
  }
})

export const errorActions = errorSlice.actions

export default errorSlice.reducer