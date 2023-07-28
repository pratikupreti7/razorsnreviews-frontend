import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  reviews: [],
  loading: false,
  error: null,
  addSuccess: false,
  editSuccess: false,
};

const reviewSlice = createSlice({
  name: 'review',
  initialState,
  reducers: {
    // fetchStart: (state) => {
    //   state.loading = true;
    //   state.error = null;
    //   state.addSuccess = false;
    // },
    // fetchSuccess: (state, action) => {
    //   state.loading = false;
    //   state.error = null;
    //   state.reviews = action.payload;
    //   state.addSuccess = false;
    // },
    // fetchFailure: (state, action) => {
    //   state.loading = false;
    //   state.error = action.payload;
    //   state.addSuccess = false;
    // },
    addStart: (state) => {
      state.loading = true;
      state.error = null;
      state.addSuccess = false;
    },
    addSuccess: (state, action) => {
      state.loading = false;
      state.error = null;
      state.addSuccess = true;
      state.reviews.push(action.payload);
    },
    addFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.addSuccess = false;
    },
    editStart: (state) => {
      state.loading = true;
      state.error = null;
      state.editSuccess = false;
    },
    editSuccess: (state, action) => {
      state.loading = false;
      state.error = null;
      state.editSuccess = true;
      // Update the review in the reviews array with the edited data
      state.reviews = state.reviews.map((review) =>
        review.id === action.payload.id ? action.payload : review
      );
    },
    editFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.editSuccess = false;
    },
    deleteStart: (state) => {
      state.loading = true;
      state.error = null;
      state.addSuccess = false;
    },
    deleteSuccess: (state, action) => {
      state.loading = false;
      state.error = null;
      state.addSuccess = false;
      state.reviews = state.reviews.filter(
        (review) => review.id !== action.payload.id
      );
    },
    deleteFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.addSuccess = false;
    },
  },
});

export const {
//   fetchStart,
//   fetchSuccess,
//   fetchFailure,
  addStart,
  addSuccess,
  addFailure,
  editStart,
  editSuccess,
  editFailure,
  deleteStart,
  deleteSuccess,
  deleteFailure,
} = reviewSlice.actions;

export default reviewSlice.reducer;
