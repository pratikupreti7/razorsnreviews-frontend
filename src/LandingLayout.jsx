import React from 'react'
import { Outlet } from 'react-router-dom'

const LandingLayout = () => {
  return (
    <>
      <div
        className="flex flex-grow mt-[-2px] flex-col  items-center justify-center  h-[87vh] bg-cover"
        style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/hero.jpg)` }}
      >
        <div className="flex-grow flex justify-center items-center">
          <Outlet />
        </div>
      </div>
    </>
  )
}

export default LandingLayout
