import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import SalonItem from '../SalonItem/SalonItem'
import { useDispatch, useSelector } from 'react-redux'
//
import { Link } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Puff } from 'react-loader-spinner'
import UploadImages from './UploadImages'
import Loading from 'react-loading'
import RatingSummary from './RatingSummary'
import ReviewsContainer from './ReviewContainer'
import ImageSlider from './ImageSlider'
import {
  fetchSalonsByIdAsync,
  deleteSalonsByIdAsync,
} from '../../store/apiSalonCalls'
import StarRatingForm from './StarRatingForm'
// import {deleteSalonsByIdAsync} from '../../store/apiSalonCalls'
const SalonPage = () => {
  const formatDate = (dateString) => {
    const date = new Date(dateString)
    const formattedDate = date.toLocaleDateString()
    return formattedDate
  }
  const { id } = useParams() // Access the salon ID from the URL
  const [loadingId, setLoadingId] = useState(true)
  const dispatch = useDispatch()
  const user = useSelector((state) => state?.user?.userInfo?._id) || ''
  const userinfo = useSelector((state) => state?.user?.userInfo)
  const salon = useSelector((state) => state.salon.salons)
  const loading = useSelector((state) => state.salon.loading)

  const [CanEditorDelete, setCanEditorDelete] = useState(false)
  const [messageSalonCreated, setMessageSalonCreated] = useState('')
  const salonPage = false
  const isEditPage = true
  const [showConfirmation, setShowConfirmation] = useState(false)
  const handleDelete = () => {
    setShowConfirmation(true)
  }
  const navigate = useNavigate()
  const handleCancelDelete = () => {
    setShowConfirmation(false)
  }
  const handleConfirmDelete = () => {
    dispatch(deleteSalonsByIdAsync(salon._id))
    setShowConfirmation(false)
    navigate('/?salondeleted=true') // Redirect to the homepage
    setMessageSalonCreated('Salon has been deleted.') // Set the deletion message for the homepage
  }
  useEffect(() => {
    // Check if the id is available
    if (id) {
      // The id is available, fetch the salon data
      dispatch(fetchSalonsByIdAsync(id))
        .then(() => {
          // Set loadingId to false when the data is fetched
          setLoadingId(false)
        })
        .catch((error) => {
          // Handle any errors during the data fetching process
          setLoadingId(false)
          // Optionally, you can display an error message or handle the error gracefully
          console.error('Error fetching salon data:', error)
        })
    }
  }, [dispatch, id])
  const review = useSelector((state) => state?.review?.reviews)
  useEffect(() => {
    if (salon.user === user) {
      setCanEditorDelete(true)
      setMessageSalonCreated(
        `You created this salon on ${formatDate(salon?.createdAt)}`,
      )
    } else {
      setMessageSalonCreated(``)
    }
    dispatch(fetchSalonsByIdAsync(id))
  }, [dispatch, id, user, salon.user, salon?.createdAt, salon._id, review])
  // If loadingId is true, render a loading indicator
  if (loadingId) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Puff color="#00BFFF" height={100} width={100} />
      </div>
    )
  }

  if (!id) {
    return (
      <div>
        <Loading />
      </div>
    )
  }

  const isPics = salon?.allImages

  const existingImages = salon?.pic
    ? [salon.pic, ...(isPics || [salon.pic])]
    : isPics || [salon.pic]

  const containerStyles = {
    width: '100%',
    height: '350px',

    maxWidth: '100%',
  }

  const reviews = salon?.reviews
  const salonId = salon?._id

  if (loading) {
    // Render the loading spinner while the data is being fetched
    return (
      <div className="flex justify-center items-center h-screen">
        <Puff color="#00BFFF" height={100} width={100} />
      </div>
    )
  }

  return (
    <div className="p-2">
      <ToastContainer />
      <div>
        <h1 className="text-center font-lily space-x-4 text-2xl md:text-3xl  text-gray-700 mt-4 mb-2">
          {'Welcome to ' + salon?.name}
        </h1>
      </div>
      <div className="md:flex  p-2">
        <div className="sm:h-fit  cursor-pointer bg-white shadow-lg w-full md:3/12 lg:w-5/12 lg:m-2 lg:justify-center rounded-lg overflow-hidden  mb-6 mx-1 p-6 flex flex-col justify-between'">
          <SalonItem
            salon={salon}
            salonPage={salonPage}
            isEditPage={isEditPage}
            CanEditorDelete={CanEditorDelete}
            messageSalonCreated={messageSalonCreated}
            handleConfirmDelete={handleConfirmDelete}
            handleDelete={handleDelete}
            handleCancelDelete={handleCancelDelete}
            showConfirmation={showConfirmation}
            className="m-2"
          />
        </div>

        <div className="flex md:w-2/3 flex-col justify-around items-center ">
          <div style={containerStyles} className="w-full md:w-[60%] md:p-8 ">
            <ImageSlider imageUrls={existingImages} />
          </div>

          {CanEditorDelete ? (
            <div>
              <UploadImages existingImages={existingImages} salonId={salonId} />
            </div>
          ) : (
            <div className="pt-2 w-full md:w-4/5 cursor-pointer  mt-6 bg-white p-12 shadow-lg rounded-lg">
              {userinfo != null ? (
                <StarRatingForm />
              ) : (
                <div className="m-2 p-2">
                  <h2 className="font-lexend font-bold text-2xl">
                    Please Login to Review the Salon
                  </h2>
                  <button className="bg-[#ff967068] mt-8 font-lexend hover:bg-[#ff967068]   py-2 list-none px-4 rounded">
                    <Link
                      className="p-2 m-[0.25]  text-gray-700 font-lexand text-l"
                      to="/landing/login"
                    >
                      Login
                    </Link>
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      <div className="border-t border-gray-300 border-2 w-[90%] text-center"></div>
      <div className="md:flex">
        {
          <div className="md:w-1/2 lg:w-1/3">
            <div>
              <h1 className="text-3xl font-semibold  sm:text-center md:ml-4 mb-2 font-lexend text-gray-800 ">
                User Ratings
              </h1>
              <RatingSummary reviews={reviews} />
            </div>
          </div>
        }
        <div className="md:w-1/2 lg:w-2/3">
          <h2 className="text-3xl font-semibold  sm:text-center md:ml-4 mb-2 font-lexend text-gray-800 ">
            User Reviews{' '}
          </h2>
          <ReviewsContainer reviews={reviews} userProfilePic={user} />
        </div>
      </div>
    </div>

    // </div>
  )
}

export default SalonPage
