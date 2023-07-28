import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'

const RatingSummary = ({ reviews = [] }) => {
  const ratingCounts = [0, 0, 0, 0, 0]
  let totalRatings = 0
  let totalStars = 0

  reviews.forEach((review) => {
    const rating = review.rating
    if (rating >= 1 && rating <= 5) {
      ratingCounts[rating - 1]++
      totalRatings++
      totalStars += rating
    }
  })

  const averageRating = totalRatings > 0 ? totalStars / totalRatings : 0

  const renderStars = (count) => {
    const stars = []

    for (let i = 1; i <= 5; i++) {
      const starIcon =
        i <= count ? (
          <FontAwesomeIcon key={i} icon={faStar} className="text-yellow-500" />
        ) : (
          <FontAwesomeIcon key={i} icon={faStar} className="" />
        )

      stars.push(starIcon)
    }

    return stars
  }

  return (
    <div className="rating-summary bg-white p-8 rounded-lg shadow-md md:mr-6 font-lexend">
      <h2 className="text-xl font-bold mb-4">Rating Summary</h2>
      {[1, 2, 3, 4, 5].map((rating, index) => (
        <div
          className="rating-summary-item flex items-center mb-4"
          key={rating}
        >
          <div className="text-gray-600 text-m">{rating} Stars :</div>
          <div className="rating-summary-stars flex mr-2">
            {renderStars(rating)}
          </div>
          <div>
            <span className="font-bold text-lg">
              {ratingCounts[index] > 1
                ? ratingCounts[index] + ' reviews'
                : ratingCounts[index] + ' review'}
            </span>
          </div>
        </div>
      ))}

      <div className="text-lg">
        <div className="flex">
          Average Rating :{' '}
          <span className="font-bold px-2">{averageRating.toFixed(1)} </span>
          <div className="rating-summary-stars flex ml-4 mt-1">
            {renderStars(Math.round(averageRating))}
          </div>
        </div>
      </div>
      <p className="text-lg">
        Total Ratings:{' '}
        <span className="font-bold">
          {totalRatings > 1
            ? totalRatings + ' reviews'
            : totalRatings + ' review'}
        </span>
      </p>
    </div>
  )
}

export default RatingSummary
