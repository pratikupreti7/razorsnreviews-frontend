import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import ClipLoader from 'react-spinners/ClipLoader'
import { login } from '../../../store/apiCalls'
import { useDispatch, useSelector } from 'react-redux'
// import { loginSuccess } from '../../../store/userSlice'

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .min(6)
    .email('Invalid email')
    .required('Email is required'),
  password: Yup.string().min(6).required('Password is required'),
})

const Login = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { loading, error, userInfo } = useSelector((state) => state.user)
  // const user = useSelector((state) => state.user)

  useEffect(() => {
    // Check if the userInfo is available in the Redux state

    if (userInfo) {
      navigate('/')
    }
  }, [navigate, userInfo])

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      dispatch(login(values))
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
        <h1 className="text-4xl font-bold font-lily text-white-800 text-gray-700 mb-8">
          <span className="text-[#ff7476]">Welcome</span> to Razors{' '}
          <span className="text-[#ff7476]">N</span> Reviews
        </h1>
        <h6 className="text-l text-gray-700 font-lexend text-white-800 mb-8">
          Experience the Ultimate Salon Treatment: Your Beauty, Our Passion
        </h6>
        <h2 className="text-2xl font-bold font-lexend text-gray-700 mb-4">
          Login
        </h2>
        {error && <div className="text-red-500 font-lexend">{error}</div>}

        <form onSubmit={handleSubmit}>
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
              className="w-full px-4 py-2 text-gray-700  border-2 border-gray-700 font-lexend rounded mt-2 focus:outline-none focus:border-[#ff7476] focus:border-2"
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
              className="w-full px-4 py-2 font-lexend text-gray-700 border-2 border-gray-700 rounded mt-2 focus:outline-none focus:border-[#ff7476] focus:border-2"
            />
            {errors.password && touched.password && (
              <div className="text-red-500 font-lexend">{errors.password}</div>
            )}
          </div>
          {loading ? (
            <ClipLoader
              color={'#ff7476'}
              loading={loading}
              size={80}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          ) : (
            <button
              type="submit"
              className="border border-[#ff7476] bg-[#ff7476] font-lexend hover:bg-[]-700 font-bold py-3 px-12 rounded focus:outline-none focus:border-2  focus:border-[#ff7476]"
            >
              Login
            </button>
          )}
        </form>

        <div className="flex justify-center  space-x-4 mt-4">
          <span className="text-gray-700">Don't have an account with us?</span>
          <Link
            to="/landing/register"
            className=" font-lexand text-[#ff7476] underline ml-2 font-xl font-bold "
          >
            Register
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Login
