import React from 'react'
import Navbar from '../components/Navbar'
import Products from '../components/Products'
import Announcement from './../components/Announcement'
import ProductGallery from '../components/ProductGallery'
import Footer from '../components/Footer'
import Newsletter from '../components/Newsletter'

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