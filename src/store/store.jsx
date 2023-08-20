import { configureStore } from '@reduxjs/toolkit'
import userReducer from './userSlice'
import salonReducer from '../store/salonSlice'
import reviewReducer from '../store/reviewSlice'
export default configureStore({
  reducer: {
    user: userReducer,
    salon: salonReducer,
    review: reviewReducer,
  },
  
})
