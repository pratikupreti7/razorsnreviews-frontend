import React, { useState, useEffect } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { ClipLoader } from 'react-spinners'
import { useNavigate } from 'react-router-dom'
import { addSalonAsync } from '../../store/apiSalonCalls'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'

const validationSchema = Yup.object().shape({
  // Validation schema definition...
  name: Yup.string().min(2).max(255).required(),
  description: Yup.string().min(10).max(500).required(),
  address: Yup.string().min(5).max(255).required(),
  city: Yup.string().min(2).max(50).required(),
  state: Yup.string().length(2).required(),
  zip: Yup.string().min(5).max(10).required(),
  phone: Yup.string().min(10).max(20).required(),
  email: Yup.string().email().required(),
  services: Yup.array().of(Yup.string()),
  website: Yup.string().url().required(),
  covidSafetyRating: Yup.number().min(1).max(2),
  price: Yup.number().min(1).required(),
})

const AddSalon = () => {
  const [loading, setLoading] = useState(false)

  const [imageUploaded, setImageUploaded] = useState(false)
  const [picMessage, setPicMessage] = useState('')
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const userInfo = useSelector((state) => state.user.userInfo)
  const error = useSelector((state) => state?.salon?.error)
  const addSuccess = useSelector((state) => state?.salon?.addSuccess)
  const SalonId = useSelector((state) => state?.salon?.salons?._id)

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
          formik.setFieldValue('pic', data.url.toString())
          setImageUploaded(true)
        })

        .catch((err) => {
          return setPicMessage('Please Select only JPEG/PNG ')
        })
    } else {
      return setPicMessage('Please Select an Image')
    }
  }

  useEffect(() => {
    if (addSuccess) {
      
      navigate(`/salon/${SalonId}`)
      // Navigates to the newly added salon page
    }
  }, [addSuccess, navigate, SalonId])

  const formik = useFormik({
    initialValues: {
      name: '',
      description: '',
      address: '',
      city: '',
      state: '',
      zip: '',
      phone: '',
      email: '',
      website: '',
      services: [],
      price: 0,
      pic: '',
    },
    validationSchema: validationSchema,

    onSubmit: async (values) => {
      try {
        if (!userInfo || !userInfo.token) {
          throw new Error('You need to be logged in to add a salon.')
        }

        setLoading(true)
        const newSalonId = await dispatch(addSalonAsync(values))
        setLoading(false)

        if (newSalonId) {
          navigate(`/salon/${newSalonId}`)
          // Navigates to the newly added salon page
        }
      } catch (error) {
        console.error(error)
        setLoading(false)
      }
    },
  })

  const {
    values,
    errors,
    touched,
    handleChange,
    handleSubmit,
    handleBlur,
  } = formik

  const handleServiceChange = (service) => {
    const updatedServices = values.services.includes(service)
      ? values.services.filter((s) => s !== service)
      : [...values.services, service]
    formik.setFieldValue('services', updatedServices)
  }

  return (
    <div className="flex justify-center m-4">
      <div className="bg-white px-12 py-1 md:w-2/3 lg:w-1/3  flex flex-col justify center rounded shadow-md ">
        <h2 className="text-3xl font-bold font-lily  text-gray-700 mb-1">
          Add Your Salon
        </h2>

        <form onSubmit={handleSubmit}>
          {/* Form fields... */}
          <div className="mb-4">
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
            {picMessage && touched.picMessage && (
              <div className="text-red-500 font-lexend">{picMessage}</div>
            )}
          </div>

          <div className="mb-1">
            <label htmlFor="name" className="font-lexend  text-gray-700">
              Name:
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={values.name}
              onChange={handleChange}
              onBlur={handleBlur}
              className="w-full px-4 py-1 font-lexend text-gray-700 border-2 border-gray-700 rounded mt-1 focus:outline-none focus:border-[#ff7476] focus:border-2"
            />
            {errors.name && touched.name && (
              <div className="text-red-500 font-lexend">{errors.name}</div>
            )}
          </div>
          <div className="mb-1">
            <label htmlFor="description" className="font-lexend text-gray-700">
              Description:
            </label>
            <input
              id="description"
              name="description"
              value={values.description}
              onChange={handleChange}
              onBlur={handleBlur}
              className="w-full px-4 py-1 font-lexend text-gray-700 border-2 border-gray-700 rounded mt-1 focus:outline-none focus:border-[#ff7476] focus:border-2"
            ></input>
            {errors.description && touched.description && (
              <div className="text-red-500 font-lexend">
                {errors.description}
              </div>
            )}
          </div>
          <div className="mb-2">
            <label htmlFor="address" className="font-lexend text-gray-700">
              Address:
            </label>
            <input
              id="address"
              name="address"
              value={values.address}
              onChange={handleChange}
              onBlur={handleBlur}
              className="w-full px-4 py-1 font-lexend text-gray-700 border-2 border-gray-700 rounded mt-1 focus:outline-none focus:border-[#ff7476] focus:border-2"
            ></input>
            {errors.address && touched.address && (
              <div className="text-red-500 font-lexend">{errors.address}</div>
            )}
          </div>

          <div className="mb-1">
            <label htmlFor="city" className="font-lexend text-gray-700">
              City:
            </label>
            <input
              type="text"
              id="city"
              name="city"
              value={values.city}
              onChange={handleChange}
              onBlur={handleBlur}
              className="w-full px-4 py-1 font-lexend text-gray-700 border-2 border-gray-700 rounded mt-1 focus:outline-none focus:border-[#ff7476] focus:border-2"
            />
            {errors.city && touched.city && (
              <div className="text-red-500 font-lexend">{errors.city}</div>
            )}
          </div>
          <div className="mb-1">
            <label htmlFor="state" className="font-lexend text-gray-700">
              State:
            </label>
            <input
              type="text"
              id="state"
              name="state"
              value={values.state}
              onChange={handleChange}
              onBlur={handleBlur}
              className="w-full px-4 py-1 font-lexend text-gray-700 border-2 border-gray-700 rounded mt-1 focus:outline-none focus:border-[#ff7476] focus:border-2"
            />
            {errors.state && touched.state && (
              <div className="text-red-500 font-lexend">{errors.state}</div>
            )}
          </div>

          <div className="mb-4">
            <label htmlFor="zip" className="font-lexend text-gray-700">
              Zip:
            </label>
            <input
              type="text"
              id="zip"
              name="zip"
              value={values.zip}
              onChange={handleChange}
              onBlur={handleBlur}
              className="w-full px-4 py-1 font-lexend text-gray-700 border-2 border-gray-700 rounded mt-1 focus:outline-none focus:border-[#ff7476] focus:border-2"
            />
            {errors.zip && touched.zip && (
              <div className="text-red-500 font-lexend">{errors.zip}</div>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="phone" className="font-lexend text-gray-700">
              Phone:
            </label>
            <input
              type="text"
              id="phone"
              name="phone"
              value={values.phone}
              onChange={handleChange}
              onBlur={handleBlur}
              className="w-full px-4 py-1 font-lexend text-gray-700 border-2 border-gray-700 rounded mt-1 focus:outline-none focus:border-[#ff7476] focus:border-2"
            />
            {errors.phone && touched.phone && (
              <div className="text-red-500 font-lexend">{errors.phone}</div>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="price" className="font-lexend text-gray-700">
              Price:
            </label>
            <input
              type="text"
              id="price"
              name="price"
              value={values.price}
              onChange={handleChange}
              onBlur={handleBlur}
              className="w-full px-4 py-2 border-2 border-gray-600 font-lexend text-black rounded mt-2 focus:outline-none focus:border-[#ff7476] focus:border-2"
            />
            {errors.price && touched.price && (
              <div className="text-red-500 font-lexend">{errors.price}</div>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="font-lexend text-gray-700">
              Email:
            </label>
            <input
              type="text"
              id="email"
              name="email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              className="w-full px-4 py-2 border-2 border-gray-600 font-lexend text-black rounded mt-2 focus:outline-none focus:border-[#ff7476] focus:border-2"
            />
            {errors.email && touched.email && (
              <div className="text-red-500 font-lexend">{errors.email}</div>
            )}
          </div>

          <div className="mb-4">
            <label htmlFor="services" className="font-lexend text-gray-700">
              Services:
            </label>
            <div className="flex items-center mt-2">
              <label className="mr-4">
                <input
                  type="checkbox"
                  name="services"
                  value="haircut"
                  checked={values.services.includes('haircut')}
                  onChange={() => handleServiceChange('haircut')}
                />
                Haircut
              </label>
              <label className="mr-4">
                <input
                  type="checkbox"
                  name="services"
                  value="coloring"
                  checked={values.services.includes('coloring')}
                  onChange={() => handleServiceChange('coloring')}
                />
                Coloring
              </label>
              <label className="mr-4">
                <input
                  type="checkbox"
                  name="services"
                  value="styling"
                  checked={values.services.includes('styling')}
                  onChange={() => handleServiceChange('styling')}
                />
                Styling
              </label>
              <label>
                <input
                  type="checkbox"
                  name="services"
                  value="spa"
                  checked={values.services.includes('spa')}
                  onChange={() => handleServiceChange('spa')}
                />
                Spa
              </label>
            </div>
            {errors.services && touched.services && (
              <div className="text-red-500 font-lexend">{errors.services}</div>
            )}
          </div>

          <div className="mb-4">
            <label htmlFor="website" className="font-lexend text-gray-700">
              Website:
            </label>
            <input
              type="text"
              id="website"
              name="website"
              value={values.website}
              onChange={handleChange}
              onBlur={handleBlur}
              className="w-full px-4 py-2 border-2 border-gray-600 font-lexend text-black rounded mt-2 focus:outline-none focus:border-[#ff7476] focus:border-2"
            />
            {errors.website && touched.website && (
              <div className="text-red-500 font-lexend">{errors.website}</div>
            )}
          </div>

          {/* Add the remaining form fields based on your schema */}
          {/* ... */}

          <button
            type="submit"
            className="border border-[#ff7476] bg-[#ff7476] text-lexand hover:bg-[]-700 text-white font-bold py-3 px-12 rounded focus:outline-none focus:border-2  focus:border-[#ff7476]"
          >
            Add Salon
          </button>
          {loading && (
            <div className="mt-4">
              <ClipLoader color={'#ff7476'} loading={loading} size={30} />
            </div>
          )}
        </form>
      </div>
      {error && (
        <div className="fixed top:20 right-0  md:fixed md:top-30 md:w-96 md:right-40 bg-red-600 h-10 m-2 text-white text-center font-semibold py-2 px-6 rounded-lg shadow-lg transition-opacity duration-500 ease-in-out">
          {error}
        </div>
      )}
    </div>
  )
}

export default AddSalon
