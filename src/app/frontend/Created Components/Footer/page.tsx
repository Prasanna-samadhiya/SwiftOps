import React from 'react'

interface Props {}

function Footer(props: Props) {
    const {} = props

    return (
        <footer className="bg-gray-800 text-white py-4  w-full h-24">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        
         <div className="flex space-x-4">
          <a href="/">
            <a className="hover:text-gray-400 text-sm">Home</a>
          </a>
          <a href="/frontend/pages/About">
            <a className="hover:text-gray-400 text-sm">About</a>
          </a>
          <a href="/frontend/pages/contact">
            <a className="hover:text-gray-400 text-sm">Contact</a>
          </a>
        </div>

        <div className="mb-4 md:mb-0 ">
          <p className="text-sm">&copy; {new Date().getFullYear()} MyApp. All rights reserved.</p>
        </div>
      </div>
    </footer>
    )
}

export default Footer
