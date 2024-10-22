import { SearchOutlined, ShoppingCartOutlined } from '@mui/icons-material';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import LazyLoad from 'react-lazyload';
import { useDispatch, useSelector } from 'react-redux';
import { addToWishlist, removeFromWishlist } from '../store/slices/wishlistSlice';
import { Box, useToast } from '@chakra-ui/react';
import { useState } from 'react';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { getProductByIdAPI } from '../services/products/productService';
import { addToCart } from '../store/slices/cartSlice';

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
  height: 75%;
  width: 60%;
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: auto;
`;

const Image = styled.img`
  height: 100%;
  width: 100%;
  object-fit: cover;
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
  background-color: #f0f0f0;
`;
const Product = ({ item }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const toast = useToast();
  const wishlist = useSelector((state) => state.wishlist?.items);
  const isInWishlist = wishlist?.some((item) => item._id === item?._id);
  const [isProductInWishlist, setIsProductInWishlist] = useState(isInWishlist);

  const handleProductSearch = (id) => {
    navigate(`/product/${id}`);
  };

  const handleAddToCart = async (_id) => {
    try {
      const product = await getProductByIdAPI(_id);
      const itemToAdd = {
        productId: product._id,
        name: product.name,
        price: product.price,
        image: product.imageUrl,
        brand: product.brand,
        category: product.category,
        quantity: 1,
      };
      const result = await dispatch(addToCart(itemToAdd)).unwrap();
      if (result.response) {
        toast({
          position: 'bottom-right',
          status: 'success',
          render: () => (
            <Box color='white' p={3} bg='teal' borderRadius={4}>
              Product added to cart.
            </Box>
          ),
        });
      }
    } catch (err) {
      toast({
        position: 'bottom-right',
        status: 'error',
        render: () => (
          <Box color='white' p={3} bg='red' borderRadius={4}>
            Error adding product to cart.
          </Box>
        ),
      });
    }
  };

  const handleAddToWishlist = (item) => {
    if (isProductInWishlist) {
      setIsProductInWishlist(false);
      dispatch(removeFromWishlist(item._id));
      toast({
        position: 'bottom-right',
        render: () => (
          <Box color='white' p={3} bg='teal' borderRadius={4}>
            Product removed from wishlist!
          </Box>
        ),
      });
    } else {
      dispatch(addToWishlist(item));
      setIsProductInWishlist(true);
      toast({
        position: 'bottom-right',
        render: () => (
          <Box color='white' p={3} bg='teal' borderRadius={4}>
            Product added to wishlist!
          </Box>
        ),
      });
    }
  };

  return (
    <Container>
      <Circle />
      <ImageContainer>
        <LazyLoad height={200.5} offset={10} once placeholder={<Placeholder />}>
          <Image src={item?.imageUrl} />
        </LazyLoad>
      </ImageContainer>
      <Info>
        <Link to='/cart'>
          <Icon onClick={() => handleAddToCart(item?._id)}>
            <ShoppingCartOutlined />
          </Icon>
        </Link>

        <Icon onClick={() => handleProductSearch(item?._id)}>
          <SearchOutlined />
        </Icon>
        <Icon onClick={() => handleAddToWishlist(item)}>
          {!isProductInWishlist ? <FavoriteBorderIcon style={{ color: 'teal' }} /> : <FavoriteIcon style={{ color: 'teal' }} />}
        </Icon>
      </Info>
    </Container>
  );
};

export default Product;
