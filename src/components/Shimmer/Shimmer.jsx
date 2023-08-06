import React from 'react'
import './styles.css'
const Shimmer = () => (
  <div className="animate-shimmer bg-gradient-to-r from-gray-200 to-gray-300 h-full w-full">
    <div className="flex flex-col mt-6 space-y-4">
      {/* Header */}
      <div className="h-8 bg-gray-300 rounded-sm"></div>

      {/* Image */}
      <div className="w-full h-48 bg-gray-300 rounded-lg"></div>

      {/* Content */}
      <div className="h-6 bg-gray-300 rounded-sm"></div>
      <div className="h-4 bg-gray-300 rounded-sm"></div>
      <div className="h-4 bg-gray-300 rounded-sm"></div>

      {/* Ratings and Price */}
      <div className="flex justify-between items-center">
        <div className="h-6 w-1/3 bg-gray-300 rounded-sm"></div>
        <div className="h-6 w-1/3 bg-gray-300 rounded-sm"></div>
      </div>

      {/* Services */}
      <div className="flex flex-wrap space-y-2">
        <div className="h-4 w-1/3 bg-gray-300 rounded-sm"></div>
        <div className="h-4 w-1/3 bg-gray-300 rounded-sm"></div>
      </div>

      {/* Other Details */}
      <div className="h-4 bg-gray-300 rounded-sm"></div>
      <div className="h-4 bg-gray-300 rounded-sm"></div>
    </div>
  </div>
)

export default Shimmer
