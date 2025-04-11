"use client"

import React from 'react'
import Navbar from '../Created Components/Navbar/page'
import Footer from '../Created Components/Footer/page'

interface Props {}

function Page(props: Props) {
    const {} = props

    return (
        <div>
            <Navbar/>
            Hi
            <Footer/>
        </div>
    )
}

export default Page
