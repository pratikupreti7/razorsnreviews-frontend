import React, { useState, useEffect } from 'react'
import { toast, ToastContainer } from 'react-toastify'
import { useSelector } from 'react-redux'
import 'react-toastify/dist/ReactToastify.css'
// import { useSelector } from 'react-redux'
import { motion } from 'framer-motion'
import { FaStar, FaRegStar, FaStarHalf, FaCut, FaSpa } from 'react-icons/fa'
import { GiHairStrands, GiSpikedCollar } from 'react-icons/gi'
import { useDispatch } from 'react-redux'
import { editSalonByIdAsync } from '../../store/apiSalonCalls'
import { resetEditStatus } from '../../store/salonSlice'
import { Link } from 'react-router-dom'
import SalonForm from '../SalonForm/SalonForm'

const toPascalCase = (str) =>
  (str.match(/[a-zA-Z0-9]+/g) || [])
    .map((w) => `${w.charAt(0).toUpperCase()}${w.slice(1)}`)
    .join('')

const SalonItem = ({
  salon,
  salonPage,
  isEditPage,
  CanEditorDelete,
  messageSalonCreated,
  handleConfirmDelete,
  handleDelete,
  handleCancelDelete,
  showConfirmation,
  createdByCurrentUser,
  userid,
}) => {
  const dispatch = useDispatch()
  const fadeInVariant = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  }
  const hoverVariant = {
    hover: {
      scale: 1.02,
      transition: {
        duration: 0.3,
      },
      rotateX: [0, 0, 10, -10, 0],
      // rotateY: [0, 10, -10, 10, 0],
      rotateZ: [0, 10, -10, 10, 0],
    },
  }

  const hoverButtonVariant = {
    hover: { scale: 1.1, backgroundColor: '#ff9670b1', cursor: 'pointer' },
  }

  const [isEditing, setIsEditing] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const [picMessage, setPicMessage] = useState('')
  const [imageUploaded, setImageUploaded] = useState(false)
  const [salonData, setSalonData] = useState(salon)

  const [formData, setFormData] = useState({
    name: salon?.name ?? '',
    email: salon?.email ?? '',
    description: salon?.description ?? '',
    avgRating: salon?.avgRating ?? 0,
    price: salon?.price ?? '',
    services: salon?.services ?? [],
    website: salon?.website ?? '',
    phone: salon?.phone ?? '',
    address: salon?.address ?? '',
    city: salon?.city ?? '',
    state: salon?.state ?? '',
    zip: salon?.zip ?? '',
  })

  useEffect(() => {
    if (isEditing) {
      setFormData({
        name: salon?.name || '',
        email: salon?.email || '',
        description: salon?.description || '',
        avgRating: salon?.avgRating || 0,
        price: salon?.price || '',
        services: salon?.services || [],
        website: salon?.website || '',
        phone: salon?.phone || '',
        address: salon?.address || '',
        city: salon?.city || '',
        state: salon?.state || '',
        zip: salon?.zip || '',
      })
    }
  }, [isEditing, salon])

  const handleCancel = () => {
    setIsEditing(false)
  }

  const { editSuccess, error } = useSelector((state) => state.salon)

  const handleSubmit = async (e) => {
    try {
      const updatedSalon = { ...salon, ...formData, pic: formData.pic }
      const response = await dispatch(
        editSalonByIdAsync(updatedSalon._id, updatedSalon),
      )
      const updatedSalonData = response?.data // Assuming the API response contains the updated salon data

      // toast.success('Salon updated successfully')

      // Update the salon state with the new data
      setSalonData(updatedSalonData) // This 'salonData' state is not used elsewhere in the component
      setIsEditing(false) // Exit the edit mode
    } catch (error) {
      // console.log(error)
      // toast.error('Failed to update salon: ' + error.message)
    }
  }
  useEffect(() => {
    if (editSuccess) {
      toast.success('Salon edited successfully!')
      dispatch(resetEditStatus()) // Reset the editSuccess flag
    } else if (error) {
      toast.error(`Error: ${error}`)
    }
  }, [editSuccess, error, dispatch])

  // const handleInputChange = (event) => {
  //   const { name, value } = event.target

  //   setFormData((prevFormData) => ({
  //     ...prevFormData,
  //     [name]: value,
  //   }))
  // }
  const handleInputChange = (event) => {
    const { name, value } = event.target

    // Update the specific field without re-creating the whole object
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }))
  }

  const postDetails = (pics) => {
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
          setFormData((prevFormData) => ({
            ...prevFormData,
            pic: data.secure_url, // Update the 'pic' property in the formData state
          }))
          setImageUploaded(true)
        })
        .catch((err) => {
          return setPicMessage('Please Select only JPEG/PNG ')
        })
    } else {
      return setPicMessage('Please Select an Image')
    }
  }

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={fadeInVariant}
      className="bg-white "
      whileHover="hover"
    >
      <ToastContainer autoClose={2000} />
      <div className="flex flex-col mt-6">
        {createdByCurrentUser && (
          <div className="mb-1 flex h-8 items-center justify-center font-bold  text-gray-700 bg-green-200 whitespace-nowrap rounded-sm  bg-warning-100 px-[0.65em] pb-[0.25em] pt-[0.35em] text-center align-baseline text-[0.75em]  leading-none font-rubik ">
            You created this salon
          </div>
        )}
        {messageSalonCreated && (
          <div className="mb-1 flex h-8 items-center justify-center font-bold  text-gray-700 bg-green-200 whitespace-nowrap rounded-sm  bg-warning-100 px-[0.65em] pb-[0.25em] pt-[0.35em] text-center align-baseline text-[0.75em]  leading-none font-rubik">
            {messageSalonCreated}
          </div>
        )}

        {isEditing ? (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mb-4"
          >
            <label htmlFor="pic " className="font-lexend ">
              <span className="text-gray-700">Picture of your Salon:</span>
            </label>
            <input
              type="file"
              id="pic"
              name="pic"
              onChange={(e) => postDetails(e.target.files[0])}
              className="hidden"
            />
            <label
              htmlFor="pic"
              className="border border-[#ff7476] bg-[#ff7476] cursor-pointer font-lexend hover:bg-[]-700 text-white py-1 px-2 m-2 rounded focus:outline-none focus:border-2  focus:border-[#ff7476]"
            >
              {imageUploaded ? 'Photo Uploaded Successfully' : 'Choose Photo'}{' '}
            </label>
            {picMessage && picMessage && (
              <div className="text-red-500 font-lexend">{picMessage}</div>
            )}
          </motion.div>
        ) : (
          <motion.div
            className="w-full h-48 overflow-hidden mb-6 border-2 border-gray-300 rounded-lg shadow"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            variants={hoverVariant}
            whileHover="hover"
          >
            <motion.img
              className={`w-full h-full object-cover ${
                isHovered ? 'scale-110' : ''
              }`}
              src={salon?.pic || process.env.PUBLIC_URL + '/salon-default.jpeg'}
              alt={salon?.name || 'Salon'}
            />
          </motion.div>
        )}

        {isEditing ? (
          <SalonForm
            initialFormData={formData}
            handleInputChange={handleInputChange}
            handleSubmit={handleSubmit}
            handleCancel={handleCancel}
            salon={salon}
          />
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
          >
            <div className="flex justify-between duration-300">
              <h2 className="font-bold break-words text-gray-700 font-lily text-2xl space-x-4 mb-2">
                {salon?.name || 'Salon Name'}
              </h2>
              {CanEditorDelete && (
                <div>
                  {isEditPage && !isEditing && (
                    <button
                      className="pr-2 mr-2 border break-words space-x-2 border-[#ff967068] text-gray-700 bg-[#ff967068] font-lexend text-sm py-1 px-2 rounded focus:outline-none focus:border-2 focus:border-[#ff967068]"
                      onClick={() => setIsEditing(true)}
                    >
                      Edit
                    </button>
                  )}
                  <button
                    onClick={handleDelete}
                    className="border break-words space-x-2 border-[#ff967068] text-gray-700 bg-[#ff967068] font-lexend text-sm py-1 px-2 rounded focus:outline-none focus:border-2 focus:border-[#ff967068]"
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
            <p className="break-words font-lexend text-sm text-gray-600 mt-1">
              {salon?.description || ''}
            </p>
            <div className="flex justify-between items-center mb-2">
              <div className="text-lg flex items-center">
                {Array.from({ length: 5 }, (_, index) => {
                  if (salon.avgRating === undefined || salon.avgRating === 0) {
                    return <FaRegStar key={index} className="text-yellow-500" />
                  } else if (salon.avgRating >= index + 1) {
                    return <FaStar key={index} className="text-yellow-500" />
                  } else if (salon.avgRating >= index + 0.5) {
                    return (
                      <FaStarHalf key={index} className="text-yellow-500" />
                    )
                  } else {
                    return <FaRegStar key={index} className="text-yellow-500" />
                  }
                })}
              </div>

              <div className="text-gray-700 text-lg font-lexend space-x-4 mb-2">
                ${salon?.price || ' --- '}
              </div>
            </div>
            <div className="text-gray-700 text-base mb-2">
              <h3 className="font-lexend text-gray-700 text-l space-x-4 mb-2 font-bold">
                Services
              </h3>
              <ul className="flex flex-wrap list-disc text-gray-700">
                {(salon?.services || []).map((service, index) => {
                  let icon = null

                  switch (service.toLowerCase()) {
                    case 'haircut':
                      icon = <FaCut className="mr-2" />
                      break
                    case 'coloring':
                      icon = <GiHairStrands className="mr-2" />
                      break
                    case 'styling':
                      icon = <FaRegStar className="mr-2" />
                      break
                    case 'spa':
                      icon = <FaSpa className="mr-2" />
                      break
                    case 'massage':
                      icon = <GiSpikedCollar className="mr-2" />
                      break
                    case 'braiding':
                      icon = <GiSpikedCollar className="mr-2" />
                      break
                    case 'facials':
                      icon = <FaSpa className="mr-2" />
                      break
                    default:
                      break
                  }
                  const uniqueKey = `${service}-${index}`
                  return (
                    <li key={uniqueKey} className="flex p-1 items-center">
                      {icon}
                      <div className="border break-words space-x-2 border-[#ff967068] text-gray-700 bg-[#ff967068] font-lexend text-sm py-1 px-2 rounded focus:outline-none focus:border-2 focus:border-[#ff967068]">
                        {toPascalCase(service)}
                      </div>
                    </li>
                  )
                })}
              </ul>
            </div>

            {isEditPage && (
              <div className="text-gray-700 break-words font-lexend mb-4">
                <span className="font-lexend  text-gray-700 text-l space-x-4 mb-2 font-bold">
                  {' '}
                  Website :
                </span>{' '}
                {salon?.website}
              </div>
            )}
            {isEditPage && (
              <div className="text-gray-700 break-words font-lexend mb-4">
                <span className="font-lexend  text-gray-700 text-l space-x-4 mb-2 font-bold">
                  {' '}
                  Email :
                </span>{' '}
                {salon?.email}
              </div>
            )}
            <div className="text-gray-700  flex justify-between font-lexend mb-4">
              <div className="pb-2">
                <span className="font-lexend text-gray-700 text-l space-x-4 mb-2 mt-8 font-bold">
                  {' '}
                  Phone :
                </span>{' '}
                {salon?.phone}
              </div>
              {salonPage && (
                <Link
                  className="link"
                  to={'/salon/' + salon?._id}
                  key={salon?._id}
                >
                  <motion.button
                    whileHover="hover"
                    variants={hoverButtonVariant}
                    type="submit"
                    className="border space-x-4 h-8 border-[#ff967068]  bg-[#ff967068] font-lexend text-gray-700 font-py-1 px-8 rounded focus:outline-none focus:border-2 focus:border-[#ff967068]"
                  >
                    See More
                  </motion.button>
                </Link>
              )}
            </div>
            {isEditPage && (
              <div className="lg:flex md:justify-between m">
                <h2 className="text-gray-700 font-lexend">
                  <span className="font-lexend text-gray-700 text-l space-x-4 mb-2 font-bold">
                    Address :
                  </span>{' '}
                  {salon?.address +
                    ', ' +
                    salon?.city +
                    ', ' +
                    salon?.state +
                    ', ' +
                    salon?.zip}
                </h2>
              </div>
            )}

            {showConfirmation && (
              <div className="fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white p-4 rounded">
                  <p className="mb-2">
                    Are you sure you want to delete your salon?
                  </p>
                  <div className="flex justify-center ">
                    <button
                      className="border break-words space-x-2 pr-2 mr-2 border-[#ff967068] text-gray-700 bg-[#ff967068] font-lexend text-sm py-1 px-2 rounded focus:outline-none focus:border-2 focus:border-[#ff967068]"
                      onClick={handleCancelDelete}
                    >
                      Cancel
                    </button>
                    <button
                      className="border break-words space-x-2 border-[#ff967068] text-gray-700 bg-[#ff967068] font-lexend text-sm py-1 px-2 rounded focus:outline-none focus:border-2 focus:border-[#ff967068]"
                      onClick={handleConfirmDelete}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </div>
    </motion.div>
  )
}

export default SalonItem
