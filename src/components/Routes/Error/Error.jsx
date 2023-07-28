import React from 'react'
import { useRouteError } from 'react-router-dom'

const Error = () => {
  const error = useRouteError()
  console.log(error)

  return (
    <>
      <div className="flex justify-center items-center flex-col text-white font-lexend">
        <div className="flex justify-center items-center flex-col p-10 ">
          <h1 className="text-white font-lexend text-3xl">{error?.status}</h1>
          <h3 className="text-xl">{error?.statusText} </h3>
          <img
            className="error-img  h-[60vh]"
            src={process.env.PUBLIC_URL + '/error.jpeg'}
            alt="Error.jpg"
          />
        </div>
      </div>
    </>
  )
}

export default Error
