import {
  loginFailure,
  loginStart,
  loginSuccess,
  registerFailure,
  registerStart,
  registerSuccess,
  logout, // the action creator
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
    const { data } = await axios.post('/api/user/login', values, config)
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
    const { data } = await axios.post('/api/user/register', values, config)

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
