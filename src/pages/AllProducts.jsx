import Navbar from '../components/Navbar';
import Announcement from '../components/Announcement';
import ProductGallery from '../components/ProductGallery';
import Footer from '../components/Footer';

const AllProducts = () => {
  return (
    <div>
      <Announcement />
      <Navbar />
      <ProductGallery />
      <Footer />
    </div>
  );
};

export default AllProducts;
