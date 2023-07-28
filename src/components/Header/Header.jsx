import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { useDispatch, useSelector } from 'react-redux'
import { logoutUser } from '../../store/apiCalls'
import { FaBars, FaTimes } from 'react-icons/fa'
const Header = () => {
  const [isOpen, setIsOpen] = useState(false)

  const handleToggle = () => {
    setIsOpen(!isOpen)
  }
  const navigate = useNavigate()
  const handleClose = () => {
    setIsOpen(false)
  }
  const dispatch = useDispatch()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { userInfo } = useSelector((state) => state.user)

  const handleLogout = () => {
    dispatch(logoutUser())
    setIsOpen(false)
    navigate('/landing?loggedout=true')
  }

  return (
    <div className="flex justify-start  flex-col md:flex-row   pl-4 h-auto md:h-28 border-b-2 bg-[#ff967094]   ">
      {/* <div className="md:mb-12 md:pb-7  pb-[-30px]">
        <a href="/" className="">
          <img
            className=" md:h-28 md:mr-8   md:w-96  mix-blend-color-burn object-contain md:object-cover "
            src={process.env.PUBLIC_URL + '/logo/png/logo-black.png'}
            alt="app-logo"
          />
        </a>
      </div> */}
      <div className="md:mb-12 md:pb-7 pb-[-30px] md:block hidden">
        <a href="/" className="">
          <img
            className="md:h-28 md:mr-8 md:w-96 mix-blend-color-burn object-contain md:object-cover"
            src={process.env.PUBLIC_URL + '/logo/png/logo-black.png'}
            alt="app-logo"
          />
        </a>
      </div>

      <div className="h-28 md:hidden block overflow-hidden">
        <a href="/" className="p-0 m-0">
          <img
            className=" h-full mix-blend-color-burn "
            src={process.env.PUBLIC_URL + '/logo/png/logo.png'}
            alt="app-logo"
          />
        </a>
      </div>

      <div className="md:m-4 p-[0.20] w-2/3 md:mr-12  flex justify-between  items-center list-none">
        {/* <div className="flex">
          <Link
            className="p-4 m-[0.25] text-2xl  md:text-3xl font-lily font-bold text-center mb-2 my-2"
            to="/"
          >
            <li>Home</li>
          </Link>
          <Link
            className="p-4 m-[0.25] text-2xl md:text-3xl font-lily font-bold text-center mb-2 my-2"
            to="/about"
          >
            <li>About</li>
          </Link>
          <Link
            className="p-4 m-[0.25] text-2xl  md:text-3xl font-lily font-bold text-center mb-2 my-2"
            to="/faq"
          >
            <li>FAQ</li>
          </Link>
        </div> */}
        <div className="flex md:hidden">
          <button className="h-12" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>

        <div className={`${isMenuOpen ? 'block' : 'hidden'} md:flex`}>
          <Link
            className="p-4 m-[0.25] text-2xl md:text-3xl font-lily font-bold text-center mb-2 my-2"
            to="/"
            onClick={() => setIsMenuOpen(false)}
          >
            <li>Home</li>
          </Link>
          <Link
            className="p-4 m-[0.25] text-2xl md:text-3xl font-lily font-bold text-center mb-2 my-2"
            to="/about"
            onClick={() => setIsMenuOpen(false)}
          >
            <li>About</li>
          </Link>
          <Link
            className="p-4 m-[0.25] text-2xl md:text-3xl font-lily font-bold text-center mb-2 my-2"
            to="/faq"
            onClick={() => setIsMenuOpen(false)}
          >
            <li>FAQ</li>
          </Link>
        </div>
        <div className="md:mr-4  relative ">
          <button className="" onClick={handleToggle}>
            {userInfo ? (
              <div className="h-16 m-2 w-16 sm:w-16 sm:h-12 md:w-20 md:h-20 lg:w-16 lg:h-16">
                <img
                  src={userInfo?.pic}
                  alt="Profile"
                  className="h-full w-full rounded-full object-cover border-2 border-gray-300 shadow-md"
                />
              </div>
            ) : (
              <FontAwesomeIcon
                icon={faUser}
                className=" p-3 md:p-4 text-lg md:text-xl font-semibold bg-gray-600 text-white  hover:bg-gray-600 focus:bg-gray-600 transition-colors duration-200 ease-in-out border border-gray-700 rounded shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
              />
            )}
          </button>

          {isOpen && (
            <div className="absolute z-10 mt-2 right-0 w-48 font-lexend text-center bg-white rounded-md shadow-lg">
              <div className="">
                {userInfo ? (
                  <>
                    <div className="p-4 text-red-600 border-b last:border-b-0 cursor-pointer hover:bg-gray-100">
                      Hello,{' '}
                      {userInfo?.name
                        ? userInfo.name.toUpperCase().split(' ')[0]
                        : 'User'}{' '}
                      👋
                    </div>
                    <div className="p-4 border-b last:border-b-0 cursor-pointer hover:bg-gray-100">
                      <Link
                        to="/salon/add"
                        className="text-sm md:text-base"
                        onClick={handleClose}
                      >
                        Add Salon
                      </Link>
                    </div>
                    <div className="p-4 border-b last:border-b-0 cursor-pointer hover:bg-gray-100">
                      <Link
                        to="/userprofile"
                        className="text-sm md:text-base"
                        onClick={handleClose}
                      >
                        User Profile
                      </Link>
                    </div>
                    {/* Add more dropdown items as needed */}
                    <div
                      className="p-4 border-b last:border-b-0 cursor-pointer hover:bg-gray-100"
                      onClick={handleLogout}
                    >
                      <Link
                        to="/landing"
                        className="text-sm md:text-base"
                        onClick={handleClose}
                      >
                        Logout
                      </Link>
                    </div>
                  </>
                ) : (
                  <div className="p-4 border-b last:border-b-0 cursor-pointer hover:bg-gray-100">
                    <Link
                      to="/landing/login"
                      className="text-sm md:text-base"
                      onClick={handleClose}
                    >
                      Login
                    </Link>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Header
