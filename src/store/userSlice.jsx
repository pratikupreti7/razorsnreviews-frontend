import { createSlice } from '@reduxjs/toolkit'

const userInfofromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null

const userSlice = createSlice({
  name: 'user',
  initialState: {
    userInfo: userInfofromStorage,
    loading: false,
    error: null,
    profilePicture: '',
    salonuser: [],
  },
  reducers: {
    loginStart: (state) => {
      state.loading = true
      state.error = null
    },
    loginSuccess: (state, action) => {
      state.loading = false
      state.userInfo = action.payload
      state.error = null
    },

    loginFailure: (state, action) => {
      state.loading = false
      state.error = action.payload // Set the error message received from the server
    },
    logout: (state) => {
      state.userInfo = null
      state.loading = false
      state.error = null
      state.salonuser = []
    },
    registerStart: (state, action) => {
      state.loading = true
      state.error = null
    },
    registerSuccess: (state, action) => {
      state.loading = false
      state.userInfo = action.payload
      state.error = null
    },
    registerFailure: (state, action) => {
      state.loading = false
      state.error = action.payload
    },

    clearError: (state) => {
      state.error = null
    },
    // Fetch by specific ID
    fetchSalonsByUserStart: (state) => {
      state.loading = true
      state.error = null
    },
    fetchSalonsByUserSuccess: (state, action) => {
      state.loading = false
      state.error = null
      state.salonuser = action.payload
    },
    fetchSalonsByUserFailure: (state, action) => {
      state.loading = false
      state.error = action.payload
    },
  },
})

export const {
  loginStart,
  loginSuccess,
  loginFailure,
  registerStart,
  registerSuccess,
  registerFailure,
  fetchSalonsByUserStart,
  fetchSalonsByUserSuccess,
  fetchSalonsByUserFailure,
  logout,
  clearError,
  updateUserInfo,
} = userSlice.actions

export default userSlice.reducer
