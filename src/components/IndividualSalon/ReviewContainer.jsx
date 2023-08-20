import React, { useState } from 'react'
import Review from './Review'

const ReviewsContainer = ({ reviews }) => {
  const [currentPage, setCurrentPage] = useState(1)
  const reviewsPerPage = 6

  const totalPages = Math.ceil(reviews?.length / reviewsPerPage)

  const indexOfLastReview = currentPage * reviewsPerPage
  const indexOfFirstReview = indexOfLastReview - reviewsPerPage
  const currentReviews = reviews?.slice(indexOfFirstReview, indexOfLastReview)

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber)
  }

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1)
  }

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1)
  }

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {currentReviews?.map((review, index) => (
          <Review
            key={index}
            userProfilePic={
              review?.user?.profilePicture ||
              'https://cdn-icons-png.flaticon.com/512/149/149071.png'
            }
            userName={review?.user?.name || 'John Doe'}
            verifiedBuyer={'Verified Customer'}
            reviewHeading={review?.description}
            reviewDescription={review?.comment}
            rating={review?.rating}
          />
        ))}
      </div>
      {totalPages > 1 && (
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
    </div>
  )
}

export default ReviewsContainer
