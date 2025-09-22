import React, { useState } from 'react'
import logo2  from "../assets/logo2.png"
import { Link } from "react-router-dom";


const Navbar = () => {

  const [showNav, setShowNav] =useState(false)


  return (
    <>

     <nav className='bg-slate-800 shadow-lg flex items-center justify-around py-3 px-3 fixed top-0 left-0 w-full'>
      <Link to="/">
      <span className='font-semibold text-lg flex items-center'>
        <img src={logo2} alt="" className='w-23' />
      
      </span>
      </Link>

      <div className='flex items-center gap-5 text-black'>
        <Link to="/" className="py-1 px-3 text-lg font-light text-white hover:text-sky-300 rounded-2xl hover:bg-slate-700 transition duration-300">
          Home
        </Link>
          <Link to="/About" className="py-1 px-3 text-lg font-light text-white hover:text-sky-300 rounded-2xl hover:bg-slate-700 transition duration-300">
          About
        </Link>
          <Link to="/Contact" className="py-1 px-3 text-lg font-light text-white hover:text-sky-300 rounded-2xl hover:bg-slate-700 transition duration-300">
          Contact
        </Link>
          <Link to="/Product" className="py-1 px-3 text-lg font-light text-white hover:text-sky-300 rounded-2xl hover:bg-slate-700 transition duration-300">
          Product
        </Link>

      </div>
     </nav>
        
         



    </>
  )
}

export default Navbar