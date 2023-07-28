import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import ClipLoader from 'react-spinners/ClipLoader'
import { useDispatch, useSelector } from 'react-redux'
import {
  register,
} from '../../store/apiCalls'

const validationSchema = Yup.object().shape({
  name: Yup.string('Must be string')
    .min(2, 'Name must be at least 2 characters')
    .required('Name is required'),
  email: Yup.string()
    .min(6)
    .email('Invalid email')
    .required('Email is required'),
  password: Yup.string().min(6).required('Password is required'),
})

const useUserSelector = () => {
  const user = useSelector((state) => state.user)
  const navigate = useNavigate()

  useEffect(() => {
    if (user.userInfo) {
      navigate('/')
    }
  }, [user.userInfo, navigate])

  return user
}

const Register = () => {
  const [imageUploaded, setImageUploaded] = useState(false)
  const [picMessage, setPicMessage] = useState('')
  const dispatch = useDispatch()
  const user = useUserSelector()

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
          console.log(err)
        })
    } else {
      return setPicMessage('Please Select an Image')
    }
  }

  const { isFetching } = useSelector((state) => state.user)
  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      pic:
        'https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      const { name, email, password, pic } = values
      dispatch(register({ name, email, password, pic }))
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

  return (
    <div className="flex justify-center items-center">
      <div className="bg-white p-8 rounded shadow-md text-center">
        <h1 className="text-4xl font-bold font-lily text-gray-700 mb-8">
          <span className="text-[#ff7476]">Welcome</span> to Razors{' '}
          <span className="text-[#ff7476]">N</span> Reviews
        </h1>
        <h6 className="text-l  font-lexend text-gray-700 mb-8">
          Experience the Ultimate Salon Treatment: Your Beauty, Our Passion
        </h6>
        <h2 className="text-2xl font-bold font-lexend text-gray-700 mb-4">
          Register
        </h2>
        {user.error ? (
          <h2 className="text-red-500 font-lexend">{user.error}</h2>
        ) : null}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="fullName" className="font-lexend  text-gray-700">
              Name:
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={values.name}
              onChange={handleChange}
              onBlur={handleBlur}
              className="w-full px-4 py-2  border-2 border-gray-600 font-lexend text-black  rounded mt-2 focus:outline-none focus:border-[#ff7476] focus:border-2"
            />
            {errors.name && touched.name && (
              <div className="text-red-500 font-lexend">{errors.name}</div>
            )}
          </div>
          <div className="mb-4">
            <label className="font-lexend text-gray-700" htmlFor="email">
              Email:
            </label>
            <input
              type="text"
              id="email"
              name="email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              className="w-full px-4 border-2 border-gray-700 py-2  text-black font-lexend rounded mt-2 focus:outline-none focus:border-[#ff7476] focus:border-2"
            />
            {errors.email && touched.email && (
              <div className="text-red-500 font-lexend">{errors.email}</div>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="font-lexend text-gray-700">
              Password:
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              className="w-full px-4 py-2 border-2 border-gray-700 font-lexend text-black rounded mt-2 focus:outline-none focus:border-[#ff7476] focus:border-2"
            />
            {errors.password && touched.password && (
              <div className="text-red-500 font-lexend">{errors.password}</div>
            )}
          </div>
          {picMessage && <p variant="danger">{picMessage}</p>}

          <div className="mb-4">
            <label htmlFor="pic " className="font-lexend ">
              <span className="text-gray-700">Profile Picture:</span>
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
          {isFetching ? (
            <ClipLoader
              color={'#ff7476'}
              loading={isFetching}
              size={80}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          ) : (
            <button
              type="submit"
              className="border border-[#ff7476] bg-[#ff7476] text-lexand hover:bg-[]-700 text-white font-bold py-3 px-12 rounded focus:outline-none focus:border-2  focus:border-[#ff7476]"
            >
              Register
            </button>
          )}
        </form>

        <div className="flex justify-center  space-x-4 mt-4">
          <span className="text-gray-700 font-lexend">
            Already have an account with us?
          </span>
          <Link
            to="/landing/login"
            className=" font-lexand text-[#ff7476] underline ml-2 font-xl font-bold "
          >
            Login
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Register
