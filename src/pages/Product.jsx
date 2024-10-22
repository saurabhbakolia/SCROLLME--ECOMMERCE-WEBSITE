import styled from "styled-components";
import Navbar from "../components/Navbar";
import Announcement from "../components/Announcement";
import Newsletter from "../components/Newsletter";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { mobile } from "../responsive";
import { useParams } from "react-router-dom";
import { allProducts } from "../data";
import { useEffect, useState } from "react";
import Footer from "../components/Footer";

const Product = () => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const { productId } = useParams();
  const toast = useToast();
  const dispatch = useDispatch();
  const wishlist = useSelector((state) => state.wishlist?.items);
  const isInWishlist = wishlist?.some((item) => item._id === product?._id);
  const [isProductInWishlist, setIsProductInWishlist] = useState(isInWishlist);

    useEffect(() => {
        const selectedProduct = allProducts.find((item) => item.id === Number(params.productId));
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
          <ProductDetailInfo>{getDetailHeading(d)}</ProductDetailInfo>
          <ProductDetailInfo>{product?.[d]}</ProductDetailInfo>
        </DetailContainer>
      );
    });
  };

  const handleWishlistToggle = () => {
    if (isProductInWishlist) {
      setIsProductInWishlist(false);
      dispatch(removeFromWishlist(product._id));
    } else {
      dispatch(addToWishlist(product));
      setIsProductInWishlist(true);
    }
  };

  const handleImageClick = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  useEffect(() => {
    if (modalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [modalOpen]);

  if (loading) {
    return (
      <Box display='flex' justifyContent='center' alignItems='center' height='100vh'>
        <ButtonSpinner size='xl' />
      </Box>
    );
  }

    return (
        <Container>
            <Navbar />
            <Announcement />
            <Wrapper>
                <ImgContainer>
                    {product && (
                        <Image
                            src={product.img}
                            alt={product.title}
                            onClick={handleImageClick}
                        />
                    )}
                </ImgContainer>
                <InfoContainer>
                    <Title>{product?.title}</Title>
                    <Desc>{product?.desc}</Desc>
                    <Price>₹{product?.price}</Price>
                    <FilterContainer>
                        <Filter>
                            <FilterTitle>Color</FilterTitle>
                            <FilterColor color="black" />
                            <FilterColor color="darkblue" />
                            <FilterColor color="gray" />
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
                        <AmountContainer>
                            <RemoveIcon />
                            <Amount>1</Amount>
                            <AddIcon />
                        </AmountContainer>
                        <Button>ADD TO CART</Button>
                    </AddContainer>
                </InfoContainer>
            </Wrapper>
            <Newsletter />
            <Footer />

            {/* Modal for enlarged image */}
            {modalOpen && (
                <Modal>
                    <ModalContent>
                        <CloseButton onClick={closeModal}>✖</CloseButton>
                        <ModalImage src={product.img} alt={product.title} />
                    </ModalContent>
                </Modal>
            )}
        </Container>
    );
  }
  return (
    <Container>
      <Navbar />
      <Announcement />
      <Wrapper>
        <ImgContainer>{product && <Image src={product?.imageUrl} onClick={handleImageClick} />}</ImgContainer>
        <InfoContainer>
          <Flex>
            <Title>{product?.name}</Title>
            <HeartIcon isInWishlist={isProductInWishlist} onClick={handleWishlistToggle}>
              {!isProductInWishlist ? <FavoriteBorderIcon style={{ color: 'teal' }} /> : <FavoriteIcon style={{ color: 'teal' }} />}
            </HeartIcon>
          </Flex>
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
      {modalOpen && (
        <Modal>
          <ModalContent>
            <CloseButton onClick={closeModal}>✖</CloseButton>
            <ModalImage src={product?.imageUrl} alt={product.title} />
          </ModalContent>
        </Modal>
      )}
    </Container>
  );
};

export default Product;

// Styled Components
const Container = styled.div``;

const Wrapper = styled.div`
    padding: 50px;
    display: flex;
    ${mobile({ flexDirection: "column" })}
`;

  flex: 1;
  width: 200px;
`;

const Image = styled.img`
  width: fit-content;
  height: 64vh;
  object-fit: contain;
  margin-inline: auto;
  ${mobile({ height: '40vh;' })}
  ${mobile({ width: '100%;' })}
    ${tablet({ height: '40vh;' })}
    ${tablet({ width: '100%;' })}
    object-position: center;
`;

const InfoContainer = styled.div`
    flex: 1;
    padding: 0px 50px;
    ${mobile({ padding: "10px" })}
`;

const Title = styled.h1`
    font-weight: 200;
`;

const Desc = styled.p`
    margin: 20px 0px;
`;

const Price = styled.span`
    font-weight: 100;
    font-size: 40px;
`;

const FilterContainer = styled.div`
    width: 50%;
    margin: 30px 0px;
    display: flex;
    justify-content: space-between;
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
    width: 50%;
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

const AmountContainer = styled.div`
    display: flex;
    align-items: center;
    font-weight: 700;
`;

const Amount = styled.span`
    width: 30px;
    height: 30px;
    border-radius: 10px;
    border: 1px solid teal;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0px 5px;
`;

const Button = styled.button`
    padding: 15px;
    border: 2px solid teal;
    background-color: white;
    cursor: pointer;
    font-weight: 500;

    &:hover {
        background-color: #f8f4f4;
    }
`;

// Modal Styles
const Modal = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%; /* Ensures the modal takes full height of the viewport */
    background-color: rgba(0, 0, 0, 0.8); /* Semi-transparent background */
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
    overflow: hidden; /* Prevents horizontal scrolling */
`;

const ModalContent = styled.div`
    position: relative;
    width: 90%;
    max-width: 900px; /* Set max-width for the modal content */
    max-height: 90vh; /* Limit max height to allow scrolling */
    overflow-y: auto; /* Enable vertical scrolling if content exceeds height */
    overflow-x: hidden; /* Prevent horizontal scrolling */
    padding: 20px; /* Add some padding */
`;

const CloseButton = styled.button`
    position: fixed; /* Keep the button fixed */
    top: 20px; /* Space from the top */
    right: 20px; /* Space from the right */
    background-color: transparent;
    border: none;
    color: white;
    font-size: 24px;
    cursor: pointer;
    z-index: 1001; /* Ensure it appears above the modal content */
`;

const HeartIcon = styled.div`
  cursor: pointer;
  margin-left: 10px;
  color: ${({ isInWishlist }) => (isInWishlist ? 'white' : 'gray')};
`;

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  overflow: hidden;
`;

const ModalContent = styled.div`
  position: relative;
  width: 90%;
  max-width: 900px;
  max-height: 90vh;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 20px;
`;

const CloseButton = styled.button`
  position: fixed;
  top: 20px;
  right: 20px;
  background-color: transparent;
  border: none;
  color: white;
  font-size: 24px;
  cursor: pointer;
  z-index: 1001;
`;

const ModalImage = styled.img`
  width: 100%;
  max-height: 90vh;
  height: auto;
  object-fit: contain;
  transition: transform 0.3s ease;
  &:hover {
    transform: scale(1.1);
  }
`;
