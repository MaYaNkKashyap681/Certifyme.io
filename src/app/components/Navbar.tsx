import Link from 'next/link'
import React from 'react'

const Navbar = () => {
  return (

    <nav className="max-h-[5rem] sticky top-0 z-[999] border-b-[2px] border-primary">
      <div className="flex justify-between items-center h-full w-full bg-gray-900 rounded-md bg-clip-padding backdrop-filter backdrop-blur-[8rem] bg-opacity-20 shadow-sm sm:px-12 px-2 py-3 ">
        <div>
          <Link href="/">
            <span className=" text-primary text-2xl font-bold">Certify<span className='text-secondary'>Me</span>.io</span>
          </Link>
        </div>
      </div>
    </nav >
  )
}

export default Navbar