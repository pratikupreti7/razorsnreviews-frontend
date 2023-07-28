import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchSalonsAsync } from '../../../store/apiSalonCalls'
import Filters from '../../Filters/Filters'
// import SalonItem from '../../SalonItem/SalonItem'
import Search from '../../Search/Search'
import Error from '../Error/Error'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClock, faHourglass } from '@fortawesome/free-solid-svg-icons'
import { useLocation, useNavigate } from 'react-router-dom'
import ReactLoading from 'react-loading'
import { motion } from 'framer-motion'
import { Puff } from 'react-loader-spinner'
const SalonHomeList = () => {
  // const [messageSalonCreated, setMessageSalonCreated] = useState('')
  const SalonItem = React.lazy(() => import('../../SalonItem/SalonItem'))
  const [isDescendingActive, setIsDescendingActive] = useState(true)
  const [isAscendingActive, setIsAscendingActive] = useState(false)
  const userid = useSelector((state) => state?.user?.userInfo?._id) || ''

  const location = useLocation()
  const navigate = useNavigate()
  const queryParams = new URLSearchParams(location.search)
  const [showSalonDeleteMessage, setshowSalonDeleteMessage] = useState(
    queryParams.get('salondeleted') === 'true',
  )

  const dispatch = useDispatch()
  const { salons, loading, error } = useSelector((state) => state?.salon)
  const [inputSearch, setInputSearch] = useState('')
  const [filteredData, setFilteredData] = useState([])
  const [isInitialLoading, setIsInitialLoading] = useState(true)
  const [searchSuggestions, setSearchSuggestions] = useState([])

  const [filterValues, setFilterValues] = useState({
    services: [],
    ratings: [],
    price: { min: '', max: '' },
  })
  const [sortOrder, setSortOrder] = useState('descending')
  // const handleChange = (e) => {
  //   const searchValue = e.target.value
  //   setInputSearch(searchValue)
  // }
  const handleChange = (e) => {
    const searchValue = e.target.value
    setInputSearch(searchValue)

    // Update search suggestions
    if (searchValue.trim().length > 0) {
      let suggestions = salons
        .filter((salon) =>
          salon.name.toLowerCase().startsWith(searchValue.trim().toLowerCase()),
        )
        .slice(0, 5) // Limit to top 5 suggestions

      // If there are less than 5 suggestions, add salons that contain the search input
      if (suggestions.length < 5) {
        const additionalSuggestions = salons
          .filter((salon) =>
            salon.name.toLowerCase().includes(searchValue.trim().toLowerCase()),
          )
          .slice(0, 5 - suggestions.length) // Limit to the number of additional suggestions needed
        suggestions = [...suggestions, ...additionalSuggestions]
      }

      setSearchSuggestions(suggestions)
    } else {
      setSearchSuggestions([])
    }
  }

  const handleFilterChange = (name, value) => {
    if (name === 'price') {
      setFilterValues((prevValues) => ({
        ...prevValues,
        [name]: {
          min: value.min || '',
          max: value.max || '',
        },
      }))

      if (value.includes('not-rated')) {
        // Include salons that are not rated or have no average rating
        const filteredRatings = salons.filter((salon) => !salon.avgRating)
        setFilterValues((prevValues) => ({
          ...prevValues,
          ratings: filteredRatings,
        }))
      } else {
        // Exclude 'not-rated' from ratings selection
        const filteredRatings = value.filter((rating) => rating !== 'not-rated')
        setFilterValues((prevValues) => ({
          ...prevValues,
          ratings: filteredRatings,
        }))
      }
    } else {
      setFilterValues((prevValues) => ({
        ...prevValues,
        [name]: [...value],
      }))
    }
  }

  const handleSliderChange = (value) => {
    setFilterValues((prevValues) => ({
      ...prevValues,
      price: {
        min: value[0],
        max: value[1],
      },
    }))
  }

  const clearBtn = () => {
    setInputSearch('')
    setSearchSuggestions([]) // Clear search suggestions
  }

  const clearFilter = () => {
    setFilterValues({
      services: [],
      ratings: [],
      price: { min: '', max: '' },
    })
  }

  useEffect(() => {
    dispatch(fetchSalonsAsync())
      .then(() => {
        setIsInitialLoading(false)
      })
      .catch((error) => {
        setIsInitialLoading(false)
      })
    if (showSalonDeleteMessage) {
      const timer = setTimeout(() => {
        setshowSalonDeleteMessage(false)
        navigate('.', { replace: true }) // replaces the current URL
      }, 2000) // 2000ms = 2s

      return () => clearTimeout(timer) // cleanup timer on unmount
    }
  }, [showSalonDeleteMessage, navigate, dispatch])

  useEffect(() => {
    const filterSalonData = () => {
      let filteredSalons = []

      if (Array.isArray(salons)) {
        filteredSalons = [...salons]
      }

      // Filter by search input
      if (inputSearch.trim().length > 0) {
        filteredSalons = filteredSalons.filter((salon) =>
          salon.name.toLowerCase().includes(inputSearch.trim().toLowerCase()),
        )
      }

      // Filter by services
      if (filterValues.services.length > 0) {
        filteredSalons = filteredSalons.filter((salon) => {
          // Exclude salons without services
          if (!salon.services || salon.services.length === 0) {
            return false
          }
          return filterValues.services.some((service) =>
            salon.services
              .map((service) => service.toLowerCase())
              .includes(service.toLowerCase()),
          )
        })
      }

      // Filter by ratings

      if (filterValues.ratings.length > 0) {
        filteredSalons = filteredSalons.filter((salon) => {
          const salonRating = parseFloat(salon.avgRating)
          if (!salon.avgRating) {
            return false // Exclude salons without a rating
          }

          return filterValues.ratings.some((rating) => {
            if (rating === 0) {
              return salonRating === 0 // Filter for "Not Yet Rated" option
            }
            const selectedRating = parseInt(rating, 10)
            return salonRating >= selectedRating // Filter for other rating options
          })
        })
      }

      // Filter by price range
      if (filterValues.price.min !== '' && filterValues.price.max !== '') {
        filteredSalons = filteredSalons.filter((salon) => {
          // Exclude salons without price information
          if (!salon.price) {
            return false
          }
          const price = parseFloat(salon.price)
          return (
            price >= filterValues.price.min && price <= filterValues.price.max
          )
        })
      }

      // Sort the salons based on sortOrder
      if (sortOrder === 'ascending') {
        filteredSalons.sort((a, b) =>
          new Date(a.createdAt) > new Date(b.createdAt) ? 1 : -1,
        )
      } else if (sortOrder === 'descending') {
        filteredSalons.sort((a, b) =>
          new Date(a.createdAt) > new Date(b.createdAt) ? -1 : 1,
        )
      }

      setFilteredData(filteredSalons)
    }

    filterSalonData()
  }, [
    inputSearch,
    filterValues.services,
    filterValues.price.min,
    filterValues.price.max,
    filterValues.ratings,
    salons,
    sortOrder,
  ])

  const handleSortOrderChange = (order) => {
    setSortOrder(order)
  }

  const handleSortAscending = () => {
    handleSortOrderChange('ascending')
  }

  const handleSortDescending = () => {
    handleSortOrderChange('descending')
  }

  const salonPage = true

  // if (loading || isInitialLoading) {
  //   return (
  //     <div className="flex justify-center items-center h-screen">
  //       <ReactLoading type="spin" color="#fff" height={50} width={50} />
  //     </div>
  //   )
  // }

  if (error) {
    return <Error />
  }
  let mostReviewedSalon = null
  let maxReviews = 0

  for (const salon of filteredData) {
    if (salon.reviews.length > maxReviews) {
      maxReviews = salon.reviews.length
      mostReviewedSalon = salon
    }
  }

  console.log(mostReviewedSalon)

  // Animation variants
  const fadeInVariant = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  }

  const slideInLeftVariant = {
    hidden: { x: -100, opacity: 0 },
    visible: { x: 0, opacity: 1 },
  }

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={fadeInVariant}
      className="flex flex-col md:flex-row text-white justify-between"
    >
      <motion.div
        initial="hidden"
        animate="visible"
        variants={slideInLeftVariant}
        className=" w-3/5   md:w-6/12  md:h-[75vh] m-2"
      >
        <Filters
          filterValues={filterValues}
          handleChange={handleFilterChange}
          clearFilter={clearFilter}
          handleSliderChange={handleSliderChange}
        />
      </motion.div>
      <motion.div
        initial="hidden"
        animate="visible"
        variants={slideInLeftVariant}
        className="w-full md:w-full   md:ml-2"
      >
        <div className="flex   justify-center mt-2">
          <Search
            value={inputSearch}
            handleChange={handleChange}
            clearBtn={clearBtn}
            searchSuggestions={searchSuggestions}
            handleSuggestionClick={(suggestion) => {
              setInputSearch(suggestion)
              setSearchSuggestions([])
            }}
          />
        </div>

        <h2 className="p-4 text-gray-700 m-[0.25] md:text-3xl font-lily font-bold text-center mb-2 my-2">
          SALON HOME LIST
        </h2>
        <div className="absolute mt-5 mr-3 top-20 right-5">
          {showSalonDeleteMessage && (
            <div className="fixed top-30 w-96 right-40 bg-red-600 h-10 m-2 text-white text-center font-semibold py-2 px-6 rounded-lg shadow-lg transition-opacity duration-500 ease-in-out">
              Your salon has been successfully deleted.
            </div>
          )}
        </div>
        {/* Sort buttons */}
        <div className="flex m-2 justify-end md:mr-28">
          <button
            onClick={() => {
              handleSortDescending()
              setIsDescendingActive(true)
              setIsAscendingActive(false)
            }}
            className={`flex items-center justify-center px-4 py-2 ${
              isDescendingActive ? 'bg-[#ff9670b1]' : 'bg-[#ff967068]'
            } mr-2 border mt-2 space-x-4 h-8 border-[#ff967068]  bg-[#ff967068] font-lexend text-gray-700 font-py-1 px-8 rounded focus:outline-none focus:border-2 focus:border-[#ff967068] ${
              isDescendingActive
                ? 'focus:ring-[#ff9670]'
                : 'focus:ring-[#ff967068]'
            } `}
          >
            <FontAwesomeIcon icon={faClock} className="mr-2" />
            Recently Added
          </button>
          <button
            onClick={() => {
              handleSortAscending()
              setIsDescendingActive(false)
              setIsAscendingActive(true)
            }}
            className={`flex items-center justify-center px-4 py-2 ${
              isAscendingActive ? 'bg-[#ff9670b1]' : 'bg-[#ff967068]'
            } border mt-2 space-x-4 h-8 border-[#ff967068]  bg-[#ff967068] font-lexend text-gray-700 font-py-1 px-8 rounded focus:outline-none focus:border-2 focus:border-[#ff967068] ${
              isAscendingActive
                ? 'focus:ring-[#ff9670]'
                : 'focus:ring-[#ff967068]'
            } focus:ring-opacity-50`}
          >
            <FontAwesomeIcon icon={faHourglass} className="mr-2" />
            Oldest
          </button>
        </div>

        {!isInitialLoading && filteredData.length === 0 ? (
          <h2 className="text-center p-4  text-red-500 font-lexend">
            No salon found for this search 😞 ... Try again !
          </h2>
        ) : (
          <React.Suspense
            fallback={
              <div className="flex justify-center items-center h-screen">
                <Puff color="#00BFFF" height={300} width={300} />
              </div>
            }
          >
            <div className="flex flex-wrap justify-center p-2">
              {filteredData?.map((salon) => (
                <div
                  key={salon._id}
                  className=" cursor-pointer bg-white shadow-lg w-full md:3/12 lg:w-5/12 lg:m-2 lg:justify-center rounded-lg overflow-hidden  mb-6 mx-1 p-6 flex flex-col justify-between"
                >
                  <SalonItem
                    key={salon._id}
                    salon={salon}
                    salonPage={salonPage}
                    isEditPage={false}
                    createdByCurrentUser={salon.user === userid}
                    userid={userid}
                  />
                </div>
              ))}
            </div>
          </React.Suspense>
        )}
      </motion.div>
    </motion.div>
  )
}

export default SalonHomeList
