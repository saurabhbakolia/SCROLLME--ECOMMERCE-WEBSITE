import { FavoriteBorderOutlined, SearchOutlined, ShoppingCartOutlined } from '@mui/icons-material';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import LazyLoad from 'react-lazyload';
// import { addToCart } from '../store/Slices/cartsSlice';
import { useDispatch } from 'react-redux';
import { addToWishlist } from '../store/slices/wishlistSlice';

const Info = styled.div`
  opacity: 0;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.2);
  z-index: 3;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.5s ease;
  cursor: pointer;
`;

const Container = styled.div`
  flex: 1;
  margin: 5px;
  min-width: 280px;
  height: 350px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f5fbfd;
  position: relative;
  &:hover ${Info} {
    opacity: 1;
  }
`;
const Circle = styled.div`
  width: 200px;
  height: 200px;
  border-radius: 50%;
  background-color: white;
  position: absolute;
`;

const ImageContainer = styled.div`
  height: 75%; // Adjust as needed
  width: 60%; // Adjust as needed, should be less than or equal to height to maintain aspect ratio
  position: relative;
  overflow: hidden;
  display: flex; // Added to center content
  align-items: center; // Centering vertically
  justify-content: center; // Centering horizontally
  margin: auto;
`;

const Image = styled.img`
  height: 100%; // Ensure image fits container height
  width: 100%; // Ensure image fits container width
  object-fit: cover; // Maintain aspect ratio and cover container
  z-index: 2;
`;

const Icon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px;
  transition: all 0.5s ease;

  &:hover {
    background-color: #e9f5f5;
    transform: scale(1.1);
  }
`;

// Placeholder styled component
const Placeholder = styled.div`
  height: 100%;
  width: 100%;
  background-color: #f0f0f0; // Placeholder color
`;
const Product = ({ item }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleProductSearch = (id) => {
    navigate(`/product/${id}`);
  };

  // const handleAddToCart = (id) => {
  //   dispatch(addToCart(id)); // Dispatch the addToCart action
  //   alert('product added to cart successfully');
  // };

  const handleAddToWishlist = (id) => {
    dispatch(addToWishlist(id)); // Dispatch the addToWishlist action
    alert('Product added to wishlist');
  };

  return (
    <Container>
      <Circle />
      <ImageContainer>
        <LazyLoad height={200.5} offset={10} once placeholder={<Placeholder />}>
          <Image src={item.img} />
        </LazyLoad>
      </ImageContainer>
      <Info>
        <Link to='/cart'>
          <Icon>
            <ShoppingCartOutlined />
          </Icon>
        </Link>

        <Icon onClick={() => handleProductSearch(item.id)}>
          <SearchOutlined />
        </Icon>
        <Icon onClick={() => handleAddToWishlist(item.id)}>
          <FavoriteBorderOutlined />
        </Icon>
      </Info>
    </Container>
  );
};

export default Product;
