import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import UserDetails from './UserDetails'
import { fetchSalonsByUserAsync } from '../../../store/apiSalonCalls'
import UserSalon from './UserSalon'
import { updateUser } from '.././../../store/apiCalls'
import { clearError } from '../../../store/userSlice'
import { ToastContainer, toast } from 'react-toastify'
const UserProfile = () => {
  const { userInfo, loading, userupdateError } = useSelector(
    (state) => state.user,
  )
  const [isEditMode, setIsEditMode] = useState(false)

  const [saveAttempted, setSaveAttempted] = useState(false)
  const [salonsFetched, setSalonsFetched] = useState(false)

  const [imageUploaded, setImageUploaded] = useState(false)
  const [picMessage, setPicMessage] = useState('')
  const [editValues, setEditValues] = useState({
    userId: userInfo?._id,
    name: userInfo?.name,
    email: userInfo?.email,
    pic: userInfo?.pic,
    currentpassword: '',
    newpassword: '',
  })
  const salonuser = useSelector((state) => state.user.salonuser)
  // console.log(salonuser)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const postDetails = (pics) => {
    // setUserPic(pics)
    if (
      pics ===
      'https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg'
    ) {
      return setPicMessage('Please Select an Image')
    }
    setPicMessage(null)
    if (pics?.type === 'image/jpeg' || pics?.type === 'image/png') {
      const data = new FormData()
      data.append('file', pics)
      data.append('upload_preset', 'razorNreviews')
      data.append('cloud_name', 'razornreviews')

      fetch('https://api.cloudinary.com/v1_1/razornreviews/image/upload', {
        method: 'post',
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          // formik.setFieldValue('pic', data.url.toString())
          setImageUploaded(true)
        })

        .catch((err) => {
          console.log(err)
        })
    } else {
      return setPicMessage('Please Select an Image')
    }
  }
  const handleSave = async () => {
    // Create a copy of the editValues object
    const updateValues = { ...editValues }

    // If the password fields are empty, remove them from the update request
    if (!updateValues.currentpassword) delete updateValues.currentpassword
    if (!updateValues.newpassword) delete updateValues.newpassword

    try {
      await dispatch(updateUser(updateValues))
    } catch (error) {
      setIsEditMode(true)
    }

    setSaveAttempted(true)
  }
  useEffect(() => {
    if (saveAttempted) {
      if (userupdateError) {
        setIsEditMode(true)
        toast.error('Failed to Update Profile')
      } else {
        toast.success('Profile Updated Successfully')
        setIsEditMode(false)
      }
      setSaveAttempted(false) // Reset the saveAttempted flag
    }
    // Check if salons have already been fetched for this user
    if (!salonsFetched && userInfo?._id) {
      dispatch(fetchSalonsByUserAsync(userInfo._id))
      setSalonsFetched(true) // Mark salons as fetched
    }
  }, [saveAttempted, userupdateError, dispatch, userInfo?._id, salonsFetched])

  useEffect(() => {
    if (!loading && (!userInfo || !userInfo?.token)) {
      navigate('/landing')
    }
  }, [navigate, userInfo, loading])

  const handleEdit = () => {
    setIsEditMode(true)
  }

  const handleCancel = () => {
    dispatch(clearError())
    setEditValues((prevValues) => ({
      ...prevValues,
      currentpassword: '',
      newpassword: '',
    }))
    setIsEditMode(false)
  }

  const handleChange = (e) => {
    const { id, value } = e.target
    setEditValues((prevValues) => ({
      ...prevValues,
      [id]: value,
    }))
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-lily font-bold mb-4">User Profile</h2>
      <ToastContainer autoClose={3000} />

      <UserDetails
        userInfo={userInfo}
        isEditMode={isEditMode}
        editValues={editValues}
        handleChange={handleChange}
        handleSave={handleSave}
        handleCancel={handleCancel}
        handleEdit={handleEdit}
        error={userupdateError}
        imageUploaded={imageUploaded}
        picMessage={picMessage}
        postDetails={postDetails}
      />

      {/* Todo: Salon Added */}
      <UserSalon salonuser={salonuser} />

      <div className="mt-8">
        <h2 className="text-3xl font-lily font-bold mb-4">Your Reviews</h2>
        <div className="bg-white rounded shadow-md p-4">
          <div className="text-xl">Share your experiences!</div>
          <div className="text-lg text-gray-600 mt-2">
            Leave reviews for the salons you've visited.
          </div>
          <button className="border mt-2 m-2 space-x-4 h-8 border-[#ff967068]  bg-[#ff967068] font-lexend text-gray-700 font-py-1 px-8 rounded focus:outline-none focus:border-2 focus:border-[#ff967068]">
            Write a Review
          </button>
        </div>
      </div>
    </div>
  )
}

export default UserProfile
