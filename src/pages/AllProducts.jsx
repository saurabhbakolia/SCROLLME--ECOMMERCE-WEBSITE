import React from 'react'

import Navbar from '../Components/Navbar'
import Products from '../Components/Products'
import Announcement from '../Components/Announcement'
import ProductGallery from '../Components/ProductGallery' 

import Footer from '../Components/Footer'
import Newsletter from '../Components/Newsletter'

const AllProducts = () => {
    return (
        <div>
            <Navbar/>   
            <Announcement/>
            <ProductGallery />
            <Newsletter/>
            <Footer/>
        </div>
    )
}

export default AllProducts