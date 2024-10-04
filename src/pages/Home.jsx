import React from 'react'

import Navbar from '../Components/Navbar'

import Products from '../Components/Products'
import Newsletter from '../Components/Newsletter'
import Footer from '../Components/Footer'
import Categories from '../Components/Categories'
import Slider from '../Components/Slider'
import Announcement from '../Components/Announcement'



const Home = () => {
    return (
        <div>
            <Announcement />
            <Navbar />
            <Slider />
            <Categories />
            <Products />
            <Newsletter />
            <Footer />
        </div>
    )
}

export default Home