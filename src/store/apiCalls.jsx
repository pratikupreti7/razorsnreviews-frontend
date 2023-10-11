import {
  loginFailure,
  loginStart,
  loginSuccess,
  registerFailure,
  registerStart,
  registerSuccess,
  logout,
  updateUserInfoFailure,
  updateUserInfoStart,
  updateUserInfoSuccess,
  updateUserProfileStart,
  updateUserProfileSuccess,
  updateUserProfileFailure,
  // the action creator
} from './userSlice'
import axios from 'axios'

export const login = (values) => async (dispatch) => {
  try {
    dispatch(loginStart())
    const config = {
      headers: {
        'Content-type': 'application/json',
      },
    }
    const { data } = await axios.post(
      'https://razorsnreviews-api-lmen.onrender.com/api/user/login',
      values,
      config,
    )
    dispatch(loginSuccess(data))
    localStorage.setItem('userInfo', JSON.stringify(data))
  } catch (error) {
    dispatch(loginFailure(error?.response?.data || 'Login Failed'))
  }
}

export const register = (values) => async (dispatch) => {
  try {
    dispatch(registerStart())
    const config = {
      headers: {
        'Content-type': 'application/json',
      },
    }
    const { data } = await axios.post(
      'https://razorsnreviews-api-lmen.onrender.com/api/user/register',
      values,
      config,
    )

    dispatch(registerSuccess(data))
    dispatch(loginSuccess(data))
    localStorage.setItem('userInfo', JSON.stringify(data))
  } catch (error) {
    dispatch(registerFailure(error?.response?.data || 'Registration Failed'))
  }
}
export const logoutUser = () => async (dispatch) => {
  try {
    localStorage.removeItem('userInfo')
    dispatch(logout())
  } catch (error) {
    // Handle any error that may occur during logout
    console.log('User Not Logged Out')
  }
}
export const updateUser = (values) => {
  return async (dispatch, getState) => {
    try {
      const userInfo = getState().user.userInfo
      if (!userInfo || !userInfo.token) {
        const errorMessage = 'You need to be logged in to change your info'
        dispatch(updateUserInfoFailure(errorMessage))

        return
      }
      dispatch(updateUserInfoStart())
      const config = {
        headers: {
          'Content-type': 'application/json',
          'auth-token': userInfo.token,
        },
      }
      const { data } = await axios.post(
        'https://razorsnreviews-api-lmen.onrender.com/api/user/updateinfo',
        values,
        config,
      )
      dispatch(updateUserInfoSuccess(data))
      localStorage.setItem('userInfo', JSON.stringify(data))
    } catch (error) {
      dispatch(updateUserInfoFailure(error?.response?.data || 'Update Failed'))
    }
  }
}

export const updateUserProfile = (values) => {
  return async (dispatch, getState) => {
    try {
      const userInfo = getState().user.userInfo
      if (!userInfo || !userInfo.token) {
        const errorMessage = 'You need to be logged in to change your info'
        dispatch(updateUserProfileFailure(errorMessage))

        return
      }
      dispatch(updateUserProfileStart())
      const config = {
        headers: {
          'Content-type': 'application/json',
          'auth-token': userInfo.token,
        },
      }
      const { data } = await axios.post(
        'https://razorsnreviews-api-lmen.onrender.com/api/user/updatepic',
        values,
        config,
      )
     
      dispatch(updateUserProfileSuccess(data))
      localStorage.setItem('userInfo', JSON.stringify(data))
    } catch (error) {
      dispatch(updateUserProfileFailure(error?.response?.data || 'Update Failed'))
    }
  }
}
