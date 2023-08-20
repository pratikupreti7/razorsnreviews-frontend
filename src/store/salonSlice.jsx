import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  salons: [],
  loading: false, // status of the fetch operation
  error: null,
  addSuccess: false,
  editSuccess: false,
}

const salonSlice = createSlice({
  name: 'salon',
  initialState,
  reducers: {
    fetchStart: (state) => {
      state.loading = true
      state.error = null
      state.addSuccess = false
    },
    fetchSuccess: (state, action) => {
      state.loading = false
      state.error = null
      state.salons = action.payload
      state.addSuccess = false
    },
    fetchFailure: (state, action) => {
      state.loading = false
      state.error = action.payload
      state.addSuccess = false
    },
    // fetch by id
    fetchByIdStart: (state, action) => {
      state.loading = true
      state.error = null
      state.addSuccess = false
      // state.salons = action.payload
    },
    fetchByIdSuccess: (state, action) => {
      state.loading = false
      state.error = null
      state.salons = action.payload
      state.addSuccess = false
    },
    fetchByIdFailure: (state, action) => {
      state.loading = false
      state.error = action.payload
      state.addSuccess = false
    },
    editByIdStart: (state) => {
      state.loading = true
      state.error = null
      state.editSuccess = false
    },
    // editByIdSuccess: (state, action) => {
    //   console.log('Current state:', state)
    //   console.log('Action payload:', action.payload)
    //   console.log('state.salons before map:', [...state.salons])

    //   state.loading = false
    //   state.error = null
    //   state.editSuccess = true
    //   const updatedSalon = action.payload.salon

    //   state.salons = state.salons.map((salon) =>
    //     salon._id === updatedSalon._id ? updatedSalon : salon,
    //   )
    // },

    editByIdSuccess: (state, action) => {
     
      state.loading = false
      state.error = null
      state.editSuccess = true
      const updatedSalon = action.payload.salon

      // If state.salons is not an array, convert it into an array
      if (!Array.isArray(state.salons)) {
        state.salons = [state.salons]
      }

      state.salons = state.salons.map((salon) =>
        salon._id === updatedSalon._id ? updatedSalon : salon,
      )
    },

    editByIdFailure: (state, action) => {
      state.loading = false
      state.error = action.payload
      state.editSuccess = false
    },
    resetEditStatus: (state) => {
      state.editSuccess = false
    },

    // fetch by id
    deleteByIdStart: (state) => {
      state.loading = true
      state.error = null
      state.addSuccess = false
    },
    deleteByIdSuccess: (state, action) => {
      state.loading = false
      state.error = null
      state.addSuccess = false
      state.salons = state.salons.filter(
        (salon) => salon.id !== action.payload.id,
      )
    },
    deleteByIdFailure: (state, action) => {
      state.loading = false
      state.error = action.payload
      state.addSuccess = false
    },

    // Add Salons
    addStart: (state) => {
      state.loading = true
      state.error = null
      state.addSuccess = false
    },

    addSuccess: (state, action) => {
      state.loading = false
      state.error = null
      state.addSuccess = true
      state.salons.push(action.payload)
    },

    addFailure: (state, action) => {
      state.loading = false
      state.error = action.payload
      state.addSuccess = false
    },
  },
})

export const {
  fetchStart,
  fetchSuccess,
  fetchFailure,
  fetchByIdSuccess,
  fetchByIdFailure,
  addSuccess,
  addFailure,
  addStart,
  deleteByIdStart,
  deleteByIdFailure,
  deleteByIdSuccess,
  editByIdStart,
  editByIdSuccess,
  editByIdFailure,
  resetEditStatus,
} = salonSlice.actions

export default salonSlice.reducer
