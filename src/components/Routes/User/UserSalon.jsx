import React, { useState } from 'react'
import { Link } from 'react-router-dom'
const UserSalon = ({ salonuser }) => {
  const [currentPage, setCurrentPage] = useState(1)
  const salonsPerPage = 4

  const totalPages = Math.ceil(salonuser.length / salonsPerPage)

  // Calculate indexes for pagination
  const indexOfLastSalon = currentPage * salonsPerPage
  const indexOfFirstSalon = indexOfLastSalon - salonsPerPage
  const currentSalons = salonuser?.slice(indexOfFirstSalon, indexOfLastSalon)

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber)
  }

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1)
  }

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1)
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    const formattedDate = date.toLocaleDateString()
    return formattedDate
  }

  return (
    <div>
      <div className="mt-8 font-lexend">
        <h2 className="text-3xl font-lily font-bold mb-4">
          Salons Added By You
        </h2>
        <div className="bg-white rounded shadow-md p-4">
          {salonuser.length !== 0 ? (
            <div className="text-xl mb-2 font-lexend">
              Thanks for adding your amazing salons!
            </div>
          ) : (
            <div className="text-xl">
              We are ready to explore amazing salons!
            </div>
          )}
          {salonuser ? (
            <div className="md:flex    md:flex-wrap justify-center shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)]">
              {currentSalons?.map((salon) => (
                <div key={salon?._id} className="p-2 m-2 md:w-1/3  sm:w-full">
                  <div className="md:flex md:h-48 rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
                    <div className="h-full md:w-60">
                      <img
                        className="h-full w-full rounded-lg object-cover"
                        src={
                          salon?.pic ||
                          process.env.PUBLIC_URL + '/salon-default.jpeg'
                        }
                        alt=""
                      />
                    </div>

                    <div className="flex  md:w-2/3 flex-col justify-start p-6">
                      <h5 className="mb-2 text-xl font-medium text-neutral-800 dark:text-neutral-50">
                        {salon?.name}
                      </h5>
                      <p className="mb-4 text-xs text-neutral-600 dark:text-neutral-200 line-clamp-2">
                        {salon?.description}
                      </p>

                      <p className="text-xs text-neutral-500 dark:text-neutral-300">
                        Updated: {formatDate(salon?.updatedAt)}
                      </p>
                      <button className=" border mt-2 space-x-4 h-8 border-[#ff967068]  bg-[#ff967068] font-lexend text-gray-700 font-py-1 px-8 rounded focus:outline-none focus:border-2 focus:border-[#ff967068]">
                        <Link
                          className="link"
                          to={'/salon/' + salon?._id}
                          key={salon?._id}
                        >
                          Visit
                        </Link>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-lg text-gray-600 mt-2">
              Start by adding your favorite ones.
            </div>
          )}
          {/* Pagination */}
          {currentSalons?.length > 0 && salonuser.length > salonsPerPage && (
            <div className="flex justify-center mt-4">
              <button
                className={`mx-1 px-2 py-1 rounded ${
                  currentPage === 1
                    ? 'bg-gray-300 text-gray-600'
                    : 'bg-[#ff967068] text-gray-700'
                }`}
                disabled={currentPage === 1}
                onClick={handlePrevPage}
              >
                Prev
              </button>
              {Array.from({ length: totalPages }, (_, index) => (
                <button
                  key={index}
                  className={`mx-1 px-2 py-1 rounded ${
                    currentPage === index + 1
                      ? 'bg-[#ff967068] text-gray-700'
                      : 'bg-gray-300 text-gray-600'
                  }`}
                  onClick={() => handlePageChange(index + 1)}
                >
                  {index + 1}
                </button>
              ))}

              <button
                className={`mx-1 px-2 py-1 rounded ${
                  currentPage === totalPages
                    ? 'bg-gray-300 text-gray-600'
                    : 'bg-[#ff967068] text-gray-700'
                }`}
                disabled={currentPage === totalPages}
                onClick={handleNextPage}
              >
                Next
              </button>
            </div>
          )}

          {salonuser.length !== 0 ? (
            <button className="border mt-2 space-x-4 h-8 border-[#ff967068]  bg-[#ff967068] font-lexend text-gray-700 font-py-1 px-8 rounded focus:outline-none focus:border-2 focus:border-[#ff967068]">
              <Link to="/salon/add" className="py-2 m-2 text-sm md:text-base">
                Add More Salon
              </Link>
            </button>
          ) : (
            <button className="border mt-2 space-x-4 h-8 border-[#ff967068]  bg-[#ff967068] font-lexend text-gray-700 font-py-1 px-8 rounded focus:outline-none focus:border-2 focus:border-[#ff967068]">
              <Link to="/salon/add" className="py-2 m-2 text-sm md:text-base">
                Add New Salon
              </Link>
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default UserSalon
