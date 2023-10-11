import axios from 'axios'

import {
  fetchFailure,
  fetchSuccess,
  addStart,
  addSuccess,
  fetchByIdFailure,
  fetchByIdSuccess,
  addFailure,
  deleteByIdStart,
  deleteByIdFailure,
  deleteByIdSuccess,
  editByIdStart,
  editByIdSuccess,
  editByIdFailure,
} from './salonSlice'
import { fetchSalonsByUserFailure, fetchSalonsByUserSuccess } from './userSlice'
export const fetchSalonsAsync = () => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-type': 'application/json',
      },
    }
    const { data } = await axios.get('https://razorsnreviews-api-lmen.onrender.com/api/salon', config)

    dispatch(fetchSuccess(data))
  } catch (error) {
    dispatch(fetchFailure(error?.response?.data || 'Fetching Salon Failed'))
  }
}
export const fetchSalonsByIdAsync = (id) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-type': 'application/json',
      },
    }
    const { data } = await axios.get(`https://razorsnreviews-api-lmen.onrender.com/api/salon/${id}`, config)

    dispatch(fetchByIdSuccess(data))
  } catch (error) {
    dispatch(fetchByIdFailure(error?.response?.data || 'Fetching Salon Failed'))
  }
}
// Edit by salon async
export const editSalonByIdAsync = (id, updatedSalonData) => async (
  dispatch,
  getState,
) => {
  try {
    dispatch(editByIdStart())
    const userInfo = getState().user.userInfo

  

    if (!userInfo || !userInfo.token) {
      const errorMessage = 'You need to be logged in to edit a salon.'
      dispatch(editByIdFailure(errorMessage))
      return
    }

    const config = {
      headers: {
        'Content-Type': 'application/json',
        'auth-token': userInfo.token,
      },
    }
    const { data } = await axios.put(
      `https://razorsnreviews-api-lmen.onrender.com/api/salon/${id}`,
      updatedSalonData,
      config,
    )

    

    dispatch(editByIdSuccess(data))
  
  } catch (error) {
   
    dispatch(editByIdFailure(error?.response?.data || 'Editing Salon Failed'))
  }
}
export const deleteSalonsByIdAsync = (id) => async (dispatch, getState) => {
  try {
    dispatch(deleteByIdStart())
    const userInfo = getState().user.userInfo

    if (!userInfo || !userInfo.token) {
      const errorMessage = 'You need to be logged in to add a salon.'
      dispatch(deleteByIdFailure(errorMessage))
      return
    }

    const config = {
      headers: {
        'Content-Type': 'application/json',
        'auth-token': userInfo.token,
      },
    }
    const { data } = await axios.delete(`https://razorsnreviews-api-lmen.onrender.com/api/salon/${id}`, config)

    dispatch(deleteByIdSuccess(data))
  } catch (error) {
    dispatch(
      deleteByIdFailure(error?.response?.data || 'Deleting Salon Failed'),
    )
  }
}

export const addSalonAsync = (salonData) => {
  return async (dispatch, getState) => {
    try {
      dispatch(addStart())
      const userInfo = getState().user.userInfo

      if (!userInfo || !userInfo.token) {
        const errorMessage = 'You need to be logged in to add a salon.'
        dispatch(addFailure(errorMessage))
        return
      }

      const config = {
        headers: {
          'Content-Type': 'application/json',
          'auth-token': userInfo.token,
        },
      }

      const { data } = await axios.post('https://razorsnreviews-api-lmen.onrender.com/api/salon', salonData, config)

      dispatch(addSuccess(data))
      return data._id
    } catch (error) {
      dispatch(addFailure(error?.response?.data))
    }
  }
}

export const fetchSalonsByUserAsync = (userId) => async (
  dispatch,
  getState,
) => {
  try {
    const userInfo = getState().user.userInfo

    if (!userInfo || !userInfo.token) {
      const errorMessage = 'You need to be logged in to fetch salons.'
      dispatch(fetchSalonsByUserFailure(errorMessage))
      return
    }

    const config = {
      headers: {
        'Content-Type': 'application/json',
        'auth-token': userInfo.token,
      },
    }

    const { data } = await axios.get(`https://razorsnreviews-api-lmen.onrender.com/api/salon/user/${userId}`, config)

    dispatch(fetchSalonsByUserSuccess(data))
  } catch (error) {
    dispatch(
      fetchSalonsByUserFailure(
        error?.response?.data || 'Failed to fetch salons',
      ),
    )
  }
}
