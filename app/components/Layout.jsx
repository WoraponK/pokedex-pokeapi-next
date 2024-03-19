'use client'

import React from 'react'

const Layout = ({ children }) => {
  return (
    <div className='px-32 pt-4 pb-16 overflow-auto h-screen max-lg:px-16 max-md:px-4 max-sm:px-2'>
      {children}
    </div>
  )
}

export default Layout