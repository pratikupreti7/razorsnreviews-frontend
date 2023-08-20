import axios from 'axios'

import { addStart, addFailure, addSuccess } from './reviewSlice'

export const addReviewAsync = (reviewData) => {
  return async (dispatch, getState) => {
    try {
      dispatch(addStart())
      const userInfo = getState().user.userInfo

      if (!userInfo || !userInfo.token) {
        const errorMessage = 'You need to be logged in to add a review.'
        dispatch(addFailure(errorMessage))
        return
      }

      const config = {
        headers: {
          'Content-Type': 'application/json',
          'auth-token': userInfo.token,
        },
      }

      const { data } = await axios.post('https://razorsnreviews-api.onrender.com/api/reviews', reviewData, config)
      console.log(data)
      dispatch(addSuccess(data))
    } catch (error) {
      console.log(error)
      dispatch(addFailure(error?.response?.data))
    }
  }
}



export const changeReviewAsync = ({ salonId, ...reviewData }) => {
  return async (dispatch, getState) => {
    try {
      dispatch(addStart())
      const userInfo = getState().user.userInfo

      if (!userInfo || !userInfo.token) {
        const errorMessage = 'You need to be logged in to change a review.'
        dispatch(addFailure(errorMessage))
        return
      }

      const config = {
        headers: {
          'Content-Type': 'application/json',
          'auth-token': userInfo.token,
        },
      }

      // use PUT method to send the updated data to the server
      const { data } = await axios.put(
        `https://razorsnreviews-api.onrender.com/api/reviews/${salonId}`,
        reviewData,
        config,
      )
      console.log(data)
      dispatch(addSuccess(data))
    } catch (error) {
      console.log(error)
      dispatch(addFailure(error?.response?.data))
    }
  }
}
