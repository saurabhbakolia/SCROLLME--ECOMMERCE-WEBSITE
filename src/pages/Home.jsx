import Announcement from '../components/Announcement';
import Categories from '../components/Categories';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import Newsletter from '../components/Newsletter';
import Products from '../components/Products';
import Slider from '../components/Slider';
import FAQ from '../components/FAQ';
import BackToTopButton from '../components/BackToTopButton';
const Home = () => {
  return (
    <div>
      <Announcement />
      <Navbar />
      <Slider />
      <BackToTopButton />
      <Categories />
      <Products />
      <FAQ />
      <Newsletter />
      <Footer />
    </div>
  );
};

export default Home;
