import React from "react";



import ProductGallery from "../Components/ProductGallery"
import Announcement from "../Components/Announcement"
import Products from "../Components/Products";
import Footer from "../Components/Footer";
import Navbar from "../Components/Navbar";
import Newsletter from "../Components/Newsletter";

const AllProducts = () => {
  return (
    <div>
      <Navbar />
      <Announcement />
      <Products/>
      <ProductGallery />
      <Newsletter />
      <Footer />
    </div>
  );
};

export default AllProducts;
