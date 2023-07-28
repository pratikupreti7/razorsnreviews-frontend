import React, { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
const LandingPage = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const queryParams = new URLSearchParams(location.search)
  const [showLogoutMessage, setShowLogoutMessage] = useState(
    queryParams.get('loggedout') === 'true',
  )

  useEffect(() => {
    if (showLogoutMessage) {
      const timer = setTimeout(() => {
        toast.success('Logged out successfully')
        setShowLogoutMessage(false)
        navigate('.', { replace: true, state: {} }) // replaces the current URL
      }, 0) // 5000ms = 5s

      return () => clearTimeout(timer) // cleanup timer on unmount
    }
  }, [showLogoutMessage, navigate])
  return (
    <div>
      <div className="absolute mt-5 mr-3 top-20 right-5">
        {showLogoutMessage}
      </div>

      <div className="bg-white p-8 rounded flex flex-col justify-start items shadow-md text-center h-60 ">
        <h1 className="text-4xl text-gray-700 font-bold font-lily text-white-800 mb-8">
          <span className="text-[#ff7476]">Welcome</span> to Razors{' '}
          <span className="text-[#ff7476]">N</span> Reviews
        </h1>
        <h6 className="text-l  font-lexend text-gray-700 mb-8">
          Experience the Ultimate Salon Treatment: Your Beauty, Our Passion
        </h6>
        <div className="flex justify-center font-lexend   space-x-4">
          <button className="bg-[#ff967068] font-lexend hover:bg-[#ff967068]   py-2 list-none px-4 rounded">
            <Link
              className="p-2 m-[0.25]  text-gray-700 font-lexand text-l"
              to="/landing/login"
            >
              Login
            </Link>
          </button>
          <button className="bg-gray-600  hover:bg-gray-700 text-white  py-2 px-4 rounded">
            <Link
              className="p-2 m-[0.25]  text-white font-lexand text-l"
              to="/landing/register"
            >
              Register
            </Link>
          </button>
        </div>
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  )
}

export default LandingPage
