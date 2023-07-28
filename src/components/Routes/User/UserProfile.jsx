import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import UserDetails from './UserDetails'
import { fetchSalonsByUserAsync } from '../../../store/apiSalonCalls'
import UserSalon from './UserSalon'

const UserProfile = () => {
  const { userInfo } = useSelector((state) => state.user)
  const [isEditMode, setIsEditMode] = useState(false)
  const [editValues, setEditValues] = useState({
    name: userInfo?.name,
    email: userInfo?.email,
    pic: userInfo?.pic,
  })
  const salonuser = useSelector((state) => state.user.salonuser)
  console.log(salonuser)
  // const user = useSelector((state) => state.user)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  useEffect(() => {
    if (!userInfo || !userInfo?.token) {
      navigate('/landing')
      // throw new Error('You need to be logged in to view your Profile')
    }
    if (userInfo) {
      dispatch(fetchSalonsByUserAsync(userInfo._id))
      navigate('/userprofile')
    }
  }, [navigate, userInfo, dispatch])

  const handleEdit = () => {
    setIsEditMode(true)
  }

  const handleCancel = () => {
    setIsEditMode(false)
    setEditValues({
      name: userInfo?.name,
      email: userInfo?.email,
      pic: userInfo?.pic,
    })
  }

  const handleSave = () => {
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

      <UserDetails
        userInfo={userInfo}
        isEditMode={isEditMode}
        editValues={editValues}
        handleChange={handleChange}
        handleSave={handleSave}
        handleCancel={handleCancel}
        handleEdit={handleEdit}
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
