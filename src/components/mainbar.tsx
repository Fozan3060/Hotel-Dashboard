import React from 'react'
import { Outlet } from 'react-router'

const Mainbar = ({ children }) => {
  return (
    <div className='w-full relative'>{children}
     <div className='  bg-gray-50'>
      <Outlet />
     </div>
    </div>
  )
}

export default Mainbar