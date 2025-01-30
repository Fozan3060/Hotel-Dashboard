import React from 'react'
import { Outlet } from 'react-router'

const Mainbar = ({ children }) => {
  return (
    <div className='w-full '>
      {children}
     <div className='lg:pl-0 pl-4  pb-4 min-h-screen bg-gray-50'>
      <Outlet />
     </div>
    </div>
  )
}

export default Mainbar