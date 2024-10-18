import styled from 'styled-components';
import Navbar from '../components/Navbar';
import Announcement from '../components/Announcement';
import Newsletter from '../components/Newsletter';
import { mobile, tablet } from '../responsive';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useState } from 'react';
import Footer from '../components/Footer';
import { getProductByIdAPI } from '../services/products/productService';
import { renderStars } from '../components/ProductCard';
import { capitalizeFirstChar } from '../utils/stringUtils';
import { Box, ButtonSpinner, Text } from '@chakra-ui/react';
import { useToast } from '@chakra-ui/react';
import { addToCart } from '../store/slices/cartSlice';
import { useDispatch } from 'react-redux';

const Product = () => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { productId } = useParams();
  const toast = useToast();
  const dispatch = useDispatch();

  console.log('product', product);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const selectedProduct = await getProductByIdAPI(productId);
        setProduct(selectedProduct);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    fetchProduct();
  }, [productId]);

  const handleAddToCart = async () => {
    try {
      console.log('product', product);
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
          title: 'Product added to cart.',
          description: 'You can view your cart to proceed.',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (err) {
      toast({
        title: 'Error adding product to cart.',
        description: err.message || 'Something went wrong.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const getDetailHeading = (detailItem) => {
    switch (detailItem) {
      case 'material':
        return capitalizeFirstChar('material');
      case 'brand':
        return `${capitalizeFirstChar('brand')} Name`;
      case 'weight':
        return capitalizeFirstChar('weight');
      case 'category':
        return `${capitalizeFirstChar('category')} Name`;
      default:
        return null;
    }
  };

  const renderProductDetails = () => {
    const productDetailItems = ['material', 'brand', 'weight', 'category'];

    return productDetailItems.map((d) => {
      return (
        <DetailContainer key={d}>
          {' '}
          {/* Add a unique key for each item */}
          <ProductDetailInfo>{getDetailHeading(d)}</ProductDetailInfo>
          <ProductDetailInfo>{product?.[d]}</ProductDetailInfo> {/* Use bracket notation to access dynamic properties */}
        </DetailContainer>
      );
    });
  };

  if (loading) {
    return (
      <Box display='flex' justifyContent='center' alignItems='center' height='100vh'>
        <ButtonSpinner size='xl' />
      </Box>
    );
  }

  if (error) {
    return (
      <Box display='flex' justifyContent='center' alignItems='center' height='100vh'>
        <Text color='red.500' fontSize='xl'>
          {error}
        </Text>
      </Box>
    );
  }
  return (
    <Container>
      <Navbar />
      <Announcement />
      <Wrapper>
        <ImgContainer>{product && <Image src={product?.imageUrl} />}</ImgContainer>
        <InfoContainer>
          <Title>{product?.name}</Title>
          <ProductRating>
            <AverageRating>{product?.ratings?.averageRating}</AverageRating>
            <ProductStar>{renderStars(product?.ratings.averageRating)}</ProductStar>
            <ProductReview>{product?.ratings.numberOfReviews} reviews</ProductReview>
          </ProductRating>
          <Desc>{product?.description}</Desc>
          <Price>$ {product?.price}</Price>
          <FilterContainer>
            <Filter>
              <FilterTitle>Color</FilterTitle>
              <FilterColor color='black' />
              <FilterColor color='darkblue' />
              <FilterColor color='gray' />
            </Filter>
            <Filter>
              <FilterTitle>Size</FilterTitle>
              <FilterSize>
                <FilterSizeOption>XS</FilterSizeOption>
                <FilterSizeOption>S</FilterSizeOption>
                <FilterSizeOption>M</FilterSizeOption>
                <FilterSizeOption>L</FilterSizeOption>
                <FilterSizeOption>XL</FilterSizeOption>
              </FilterSize>
            </Filter>
          </FilterContainer>
          <AddContainer>
            <ActionButtons>
              <Button onClick={handleAddToCart}>ADD TO CART</Button>
              <Button>BUY NOW</Button>
            </ActionButtons>
          </AddContainer>
          <ProductDetails>
            <ProductDetailTitle>Product details</ProductDetailTitle>
            {renderProductDetails()}
          </ProductDetails>
        </InfoContainer>
      </Wrapper>
      <Newsletter />
      <Footer />
    </Container>
  );
};

export default Product;

const Container = styled.div``;

const Wrapper = styled.div`
  padding: 50px;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  ${mobile({ flexDirection: 'column;' })}
  ${mobile({ padding: '10px;' })}
    ${tablet({ padding: '10px;' })}
`;

const ImgContainer = styled.div`
  flex: 1;
`;

const Image = styled.img`
  width: 100%;
  height: 64vh;
  object-fit: contain;
  ${mobile({ height: '40vh;' })}
  ${mobile({ width: '100%;' })}
    ${tablet({ height: '40vh;' })}
    ${tablet({ width: '100%;' })}
    object-position: center;
`;

const InfoContainer = styled.div`
  flex: 1;
  padding: 0px 50px;
  justify-content: flex-start;
  align-items: flex-start;
  ${mobile({ padding: '4px;' })}
  text-align: left;
`;

const Title = styled.h1`
  font-weight: 500;
  font-size: 24px;
`;

const ProductRating = styled.div`
  display: flex;
  gap: 5px;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
`;

const AverageRating = styled.p`
  font-size: 14px;
  font-weight: 400;
`;

const ProductStar = styled.div`
  width: content-fit;
  // height: 40px
  margin-inline-end: 10px;
`;

const ProductReview = styled.p`
  font-size: 14px;
  font-weight: 400;
  color: #2c90d7;
`;

const Desc = styled.p`
  margin: 10px 0px;
  font-size: 18px;
  font-weight: 400;
`;

const Price = styled.span`
  font-weight: 200;
  font-size: 40px;
`;

const FilterContainer = styled.div`
  width: 50%;
  margin: 30px 0px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 20px;
`;

const Filter = styled.div`
  display: flex;
  align-items: center;
`;

const FilterTitle = styled.span`
  font-size: 20px;
  font-weight: 200;
`;

const FilterColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
  margin: 0px 5px;
  cursor: pointer;
`;

const FilterSize = styled.select`
  margin-left: 10px;
  padding: 5px;
`;

const FilterSizeOption = styled.option``;

const AddContainer = styled.div`
  width: 80%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 10px;
`;

const ActionButtons = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
`;

const Button = styled.button`
  width: 200px;
  padding: 15px;
  border: 2px solid teal;
  background-color: white;
  cursor: pointer;
  font-weight: 500;
  &:hover {
    background-color: #f8f4f4;
  }
`;

const ProductDetails = styled.div`
  width: 320px;
  margin-block-start: 30px;
  display: flex;
  flex-direction: column;
  gap: 5px;
  justify-content: flex-start;
  align-items: flex-start;
`;

const ProductDetailTitle = styled.h2`
  font-size: 18px;
  font-weight: 600;
`;

const DetailContainer = styled.div`
  width: 100%;
  display: flex;
  gap: 10px;
  justify-content: space-between;
  align-items: center;
`;

const ProductDetailInfo = styled.p`
  width: 50%;
  font-size: 14px;
  font-weight: 500;
  text-align: left;
`;
