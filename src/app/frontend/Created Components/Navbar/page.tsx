"Use client"

import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../Redux/Store/Store';
import { logout } from '../../Redux/Slices/AuthSlice';

interface Props {}

function Navbar(props: Props) {
    const {} = props

    const [isOpen, setIsOpen] = useState(false);
    const loggedIn = useSelector((state: RootState) => state.auth.isAuthenticated);
    const dispatch = useDispatch();

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/">
          <div className="text-white text-xl font-bold">MyApp</div>
        </Link>

        <button
          onClick={toggleMenu}
          className="text-white md:hidden"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </button>

        <div className={`md:flex md:items-center md:space-x-6 ${isOpen ? 'block' : 'hidden'} `}>
            <div className={`flex ${isOpen ? 'flex-col' : 'flex-row'}`}>
          {loggedIn?
          <div className='flex flex-row'>
            <Link href="/frontend/pages/Dashboard" className='mx-2 p-1'>
            <div className="text-white hover:text-gray-400">DashBoard</div>
            </Link>
            <Link href="/frontend/pages/features" className='mx-2 p-1'>
            <div className="text-white hover:text-gray-400">Features</div>
            </Link>
            <Link href="/frontend/pages/Profile" className='mx-2 p-1'>
            <div className="text-white hover:text-gray-400">Profile</div>
            </Link>
            <div className="text-white hover:text-gray-400 mx-2 bg-green-600 p-1 rounded-lg"
             onClick={()=>{
              dispatch(logout())
             }}
            >Logout</div>
          </div>
          :
          <div className='flex flex-row'>
            <Link href="/" className='mx-2 p-1'>
            <div className="text-white hover:text-gray-400">Home</div>
            </Link>
            <Link href="/frontend/pages/About" className='mx-2 p-1'>
            <div className="text-white hover:text-gray-400">About</div>
            </Link>
            <Link href="/frontend/pages/Auth" className='mx-2 bg-green-600 p-1 rounded-lg'>
            <div className="text-white hover:text-gray-400">Register/Login</div>
            </Link>
          </div>}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar
