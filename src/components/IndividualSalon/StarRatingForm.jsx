import React, { useState, useEffect } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useDispatch, useSelector } from 'react-redux'
import '@fortawesome/fontawesome-free/css/all.css'
import { addReviewAsync, changeReviewAsync } from '../../store/apiReviews'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import { useNavigate } from 'react-router-dom'
import axios from 'axios'
const StarRatingForm = () => {
  const [loading, setLoading] = useState(false)
  const salonId = useSelector((state) => state?.salon?.salons?._id)
  const error = useSelector((state) => state?.review?.error)
  const addSuccess = useSelector((state) => state?.review?.addSuccess)
  const userToken = useSelector((state) => state?.user?.userInfo?.token)
  const userId = useSelector((state) => state?.user?.userInfo?._id)
  const review = useSelector((state) => state?.review?.reviews)
  const dispatch = useDispatch()
  const [alreadyReviewed, setAlreadyReviewed] = useState(false) // State variable for review status
  const [submitted, setSubmitted] = useState(false)
  const [editMode, setEditMode] = useState(false) // Track edit mode
  const navigate = useNavigate()
  const [reviewData, setReviewData] = useState(null)

  useEffect(() => {
    const checkReviewStatus = async () => {
      try {
        const response = await fetch(`https://razorsnreviews-api-lmen.onrender.com/api/reviews/user/${userId}`)
        const data = await response.json()
        const salonIds = data.salonIds

        if (salonIds.includes(salonId)) {
          setAlreadyReviewed(true)
        } else {
          setAlreadyReviewed(false)
        }
      } catch (error) {
        setAlreadyReviewed(false)
      }
    }

    if (userId && salonId) {
      checkReviewStatus()
    }
  }, [userId, salonId, submitted])
  //   useEffect(() => {
  //     if ((addSuccess && !editMode) || error) {
  //       const timer = setTimeout(() => {
  //         window.location.reload() // Reload the page after 3 seconds
  //       }, 100000000000)

  //       return () => clearTimeout(timer) // Clean up the timer on unmounting
  //     }
  //   }, [addSuccess, error, editMode])

  //   useEffect(() => {}, [])

  const [previousValues, setPreviousValues] = useState({
    rating: '',
    description: '',
    comment: '',
  })

  const validationSchema = Yup.object().shape({
    rating: Yup.number()
      .required('Rating is required')
      .min(1, 'Rating must be at least 1')
      .max(5, 'Rating cannot be greater than 5'),
    description: Yup.string()
      .required('Description is required')
      .test(
        'word-count',
        'Description must have between 2 and 5 words',
        (value) => {
          if (value) {
            const wordCount = value.split(' ').filter((word) => word !== '')
              .length
            return wordCount >= 2 && wordCount <= 5
          }
          return false
        },
      ),
    comment: Yup.string()
      .required('Comment is required')
      .test(
        'word-count',
        'Comment  must have between 2 and 10000 words',
        (value) => {
          if (value) {
            const wordCount = value.split(' ').filter((word) => word !== '')
              .length
            return wordCount >= 2 && wordCount <= 10000
          }
          return false
        },
      ),
  })

  const formik = useFormik({
    initialValues: {
      rating: '',
      description: '',
      comment: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        setLoading(true)
        setPreviousValues(values)
        if (salonId) {
          if (editMode) {
           
            await dispatch(changeReviewAsync({ ...values, salonId })).then(
              () => {
                setAlreadyReviewed(true)
                toast.success('Review edited successfully!', {
                  toastId: 'reviewEdited',
                })
                // Toast for success
              },
            )
          } else {
            await dispatch(addReviewAsync({ ...values, salonId })).then(() => {
              setAlreadyReviewed(true)
              toast.success('Review added successfully!', {
                toastId: 'reviewAdded',
              })
              // Toast for success
            })
          }
        } else {
          throw new Error('Salon ID is undefined')
        }
      } catch (error) {
        console.error(error)
        setLoading(false)
        toast.error('Error: ' + error.message) // Toast for error
      }
    },
  })

  const starIcons = Array.from({ length: 5 }, (_, index) => index + 1)

  const handleEdit = async () => {
    setEditMode(true)
    setAlreadyReviewed(false)
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'auth-token': userToken,
        },
      }
      const response = await axios.get(
        `https://razorsnreviews-api-lmen.onrender.com/api/reviews/user/${userId}/salon/${salonId}`,
        config,
      )

      const review = response.data.review
      if (review) {
        setReviewData(review)
        formik.setValues({
          rating: review.rating.toString(),
          description: review.description,
          comment: review.comment,
        })
        setEditMode(true)
        setSubmitted(false)
      }
    } catch (error) {
      console.error(error)
    }
  }

  const handleCancel = () => {
    // formik.resetForm()
    setEditMode(false)
    setAlreadyReviewed(true)
    // if (alreadyReviewed) {
    //   setAlreadyReviewed(true)
    // }
  }

  const [previousEditMode, setPreviousEditMode] = useState(false)

  useEffect(() => {
    if (reviewData && !previousEditMode && editMode) {
      formik.setValues({
        rating: reviewData.rating.toString(),
        description: reviewData.description,
        comment: reviewData.comment,
      })
      setPreviousEditMode(editMode)
    }
  }, [reviewData, editMode, previousEditMode, review, formik])

  return (
    <div>
      {!error && alreadyReviewed ? (
        // Submitted form UI
        <div>
          <div className="text text-2xl font-lexend font-bold mb-4 mt-2">
            Thanks for rating us!
          </div>
          <div
            className="border text-center w-16 space-x-4 h-8 mt-4 border-[#ff967068]  bg-[#ff967068] font-lexend text-gray-700 p-1 rounded focus:outline-none focus:border-2 focus:border-[#ff967068]"
            onClick={handleEdit}
          >
            Edit
          </div>
        </div>
      ) : (
        // Form UI
        <div className=" mt-4">
          <ToastContainer />
          <form onSubmit={formik.handleSubmit}>
            <h2 className="text-xl font-bold text-gray-700 font-lexend mb-4">
              {editMode ? 'Edit Your Experience' : 'Rate Your Experience'}
            </h2>
            <div className="flex items-center py-2 my-2 justify-center space-x-2">
              <span className="space-x-2 text-gray-700 font-bold font-lexend">
                Rating:{' '}
              </span>
              {starIcons.map((star) => (
                <div key={star}>
                  <input
                    type="radio"
                    id={`rate-${star}`}
                    name="rating"
                    value={star}
                    onChange={formik.handleChange}
                    checked={formik.values.rating === star}
                    className="hidden"
                  />
                  <label
                    htmlFor={`rate-${star}`}
                    className={`fas fa-star text-gray-400 cursor-pointer ${
                      formik.values.rating >= star ? 'text-yellow-400' : ''
                    }`}
                  ></label>
                </div>
              ))}
            </div>
            {formik.errors.rating && (
              <div className="text-red-500 font-lexend">
                {formik.errors.rating}
              </div>
            )}
            <label
              htmlFor="description"
              className="font-lexend font-bold text-gray-700"
            >
              Description:
            </label>
            <input
              id="description"
              name="description"
              value={formik.values.description}
              onChange={formik.handleChange}
              className="w-full h-10 bg-gray-800 text-white px-4 py-2 rounded-md resize-none font-lexend focus:outline-none focus:border-gray-800 focus:border-2"
            ></input>
            {formik.errors.description && (
              <div className="text-red-500 font-lexend">
                {formik.errors.description}
              </div>
            )}
            <div className="textarea mt-4">
              <label
                htmlFor="comment"
                className="font-lexend font-bold text-gray-700"
              >
                Your Review:
              </label>
              <textarea
                id="comment"
                name="comment"
                cols="30"
                placeholder="Describe your Experience.."
                onChange={formik.handleChange}
                value={formik.values.comment}
                className="w-full h-32 bg-gray-800 text-white px-4 py-2 rounded-md resize-none font-lexend focus:outline-none focus:border-gray-800 focus:border-2"
              ></textarea>
            </div>
            {formik.errors.comment && (
              <div className="text-red-500 font-lexend">
                {formik.errors.comment}
              </div>
            )}
            <div className="btn mt-4">
              {editMode ? (
                <div>
                  <button
                    type="submit"
                    onClick={formik.handleSubmit}
                    className="border space-x-4 h-8 mt-4 border-[#ff967068]  bg-[#ff967068] font-lexend text-gray-700 font-py-1 px-8 rounded focus:outline-none focus:border-2 focus:border-[#ff967068]"
                  >
                    Save Changes
                  </button>
                  <button
                    type="button"
                    onClick={handleCancel}
                    className="border m-2 space-x-4 h-8 mt-4 border-[#ff967068]  bg-[#ff967068] font-lexend text-gray-700 font-py-1 px-8 rounded focus:outline-none focus:border-2 focus:border-[#ff967068]"
                  >
                    Cancel{' '}
                  </button>
                </div>
              ) : (
                <div>
                  <button
                    type="submit"
                    className="border space-x-4 h-8 mt-4 border-[#ff967068]  bg-[#ff967068] font-lexend text-gray-700 font-py-1 px-8 rounded focus:outline-none focus:border-2 focus:border-[#ff967068]"
                  >
                    Post{' '}
                  </button>
                </div>
              )}
            </div>
          </form>
          {/* {loading && <div>Loading...</div>} */}
          {error && (
            <div className="text-red-500 font-lexend">
              Error: {error.message}
            </div>
          )}

          {/* {addSuccess && (
            <div className="text-green-500 font-lexend">
              Review added successfully!
            </div>
          )} */}
        </div>
      )}
    </div>
  )
}

export default StarRatingForm
