import React from 'react'
import Navbar from '../Components/Navbar.jsx'
// import Products from '../components/Products'
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