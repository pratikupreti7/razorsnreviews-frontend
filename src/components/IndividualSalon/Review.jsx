import React from 'react'

const Review = ({
  userProfilePic,
  userName,
  verifiedBuyer,
  reviewHeading,
  reviewDescription,
  rating,
}) => {
  const renderStars = () => {
    const starIcons = []

    for (let i = 0; i < rating; i++) {
      starIcons.push(
        <span key={i} className="text-yellow-500 text-xl">
          &#9733;
        </span>,
      )
    }

    for (let i = rating; i < 5; i++) {
      starIcons.push(
        <span key={i} className="text-gray-400 text-xl">
          &#9734;
        </span>,
      )
    }

    return starIcons
  }
  return (
    <div className="bg-white p-4 rounded-lg shadow-lg">
      <div className="flex items-center mb-4">
        <img
          src={userProfilePic}
          alt="User Profile"
          className="w-10 h-10 rounded-full mr-4"
        />
        <div>
          <h3 className="text-lg font-semibold">{userName?.toUpperCase()}</h3>
          <p className="text-gray-500">{verifiedBuyer}</p>
        </div>
      </div>
      <div className="mb-4 font-lexend">
        <h4 className="text-lg font-semibold">{reviewHeading}</h4>
        <p className="text-gray-700">{reviewDescription}</p>
      </div>
      <div className="flex items-center">
        {renderStars()}
        <p className="text-gray-500 ml-2">{rating}</p>
      </div>
    </div>
  )
}

export default Review
