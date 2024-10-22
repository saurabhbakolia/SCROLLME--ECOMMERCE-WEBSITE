import styled from 'styled-components';
import Navbar from '../components/Navbar';
import Announcement from '../components/Announcement';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { Text } from '../styles/Text';
import { LeftDivider } from '../styles/Divider';
import { useDispatch } from 'react-redux';
import { Box, useToast } from '@chakra-ui/react';
import { deleteCartItem, updateCartItem } from '../store/slices/cartSlice';

const Container = styled.div``;

const Wrapper = styled.div`
  padding: 20px;
  margin-top: 100px;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
`;

const Title = styled.h1`
  font-weight: 300;
  text-align: center;
`;

const Top = styled.div`
  width: 76%;
  margin-inline: auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
`;

const TopButton = styled.button`
  padding: 10px;
  font-weight: 600;
  cursor: pointer;
  border: ${(props) => props.type === 'filled' && 'none'};
  background-color: ${(props) => (props.type === 'filled' ? 'black' : 'transparent')};
  color: ${(props) => props.type === 'filled' && 'white'};
`;

const TopTexts = styled.div`
  @media (max-width: 768px) {
    display: none;
  }
`;
const TopText = styled.span`
  text-decoration: underline;
  cursor: pointer;
  margin: 0px 10px;
`;

const Bottom = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-inline: auto;
  gap: 20px;

  @media (min-width: 768px) {
    flex-direction: row;
    width: 90%;
  }

  @media (min-width: 1024px) {
    width: 74%;
  }
`;

const Info = styled.div`
  flex: 3;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 14px;
`;

const Product = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.1);
  padding: 6px;
  border-radius: 2px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

const ProductDetail = styled.div`
  flex: 2;
  display: flex;
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

const Image = styled.img`
  width: 150px;
  @media (max-width: 768px) {
    width: 150px;
  }
`;

const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 3px;
  @media (max-width: 768px) {
    align-items: center;
  }
`;

const ProductName = styled.p`
  font-size: 14px;
  font-weight: 400;
  margin-block-end: 20px;
`;
const ProductBrand = styled.p`
  font-size: 16px;
  font-weight: 600;
`;

const PriceDetail = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  gap: 10px;

  @media (max-width: 768px) {
    margin-top: 10px;
  }
`;

const ProductPrice = styled.div`
  font-size: 30px;
  font-weight: 200;
`;

const Hr = styled.hr`
  background-color: #eee;
  border: none;
  height: 1px;
  margin: 10px 0;
`;

const Summary = styled.div`
  flex: 2;
  border: 0.5px solid lightgray;
  border-radius: 10px;
  padding: 20px;
  height: 50vh;
  margin-top: 20px;

  @media (max-width: 768px) {
    width: 100%;
    margin-top: 40px;
  }
`;

const SummaryTitle = styled.h1`
  font-weight: 200;
`;

const SummaryItem = styled.div`
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  font-weight: ${(props) => props.type === 'total' && '500'};
  font-size: ${(props) => props.type === 'total' && '24px'};
`;

const SummaryItemText = styled.span``;

const SummaryItemPrice = styled.span``;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: black;
  color: white;
  font-weight: 600;
`;

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const wishListItems = useSelector((state) => state.wishlist?.items);
  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  const toast = useToast();
  const dispatch = useDispatch();

  const handleQuantityChange = (productId, quantity) => {
    dispatch(updateCartItem({ productId, quantity }))
      .unwrap()
      .then(() => {
        toast({
          position: 'bottom-right',
          render: () => (
            <Box color='white' p={1} bg='teal.500' borderRadius='xs'>
              Quantity updated!
            </Box>
          ),
        });
      })
      .catch((error) => {
        console.error(error);
        toast({
          position: 'bottom-right',
          status: 'error',
          render: () => (
            <Box color='white' p={3} bg='red.500'>
              Error while updated quantity!
            </Box>
          ),
        });
      });
  };
  const handleRemoveFromCart = (productId) => {
    console.log(`Removing ${productId} from cart`);
    dispatch(deleteCartItem(productId))
      .unwrap()
      .then(() => {
        toast({
          title: 'Product removed from cart.',
          description: 'The item has been successfully removed from your cart.',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
      })
      .catch((error) => {
        toast({
          title: 'Error removing product.',
          description: 'There was an issue removing the item from your cart.',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
        console.error(error);
      });
  };

  const handleSaveForLater = (productId) => {
    console.log(`Saved product ${productId} for later`);
  };

  return (
    <Container>
      <Navbar />
      <Announcement />
      <Wrapper>
        <Title>YOUR BAG</Title>
        <Top>
          <Link to='/'>
            <TopButton>CONTINUE SHOPPING</TopButton>
          </Link>
          <TopTexts>
            <TopText>Shopping Bag({cartItems.length})</TopText>
            <TopText>
              <Link to={'/wishlist'}>Your Wishlist ({wishListItems?.length})</Link>
            </TopText>
          </TopTexts>
          <TopButton type='filled'>CHECKOUT NOW</TopButton>
        </Top>
        <Bottom>
          <Info>
            {cartItems.map((item) => (
              <Product key={item.productId}>
                <ProductDetail>
                  <Image src={item.image} />
                  <Details>
                    <ProductBrand>{item.brand}</ProductBrand>
                    <ProductName>{item.name}</ProductName>
                    <CartItemActions
                      initialQuantity={item.quantity}
                      onChange={(newQuantity) => handleQuantityChange(item.productId, newQuantity)}
                      onRemove={() => handleRemoveFromCart(item.productId)}
                      onSaveForLater={() => handleSaveForLater(item.productId)}
                    />
                  </Details>
                </ProductDetail>
                <PriceDetail>
                  <ProductPrice>$ {item.price}</ProductPrice>
                </PriceDetail>
              </Product>
            ))}
            <Hr />
          </Info>
          <Summary>
            <SummaryTitle>ORDER SUMMARY</SummaryTitle>
            <SummaryItem>
              <SummaryItemText>Subtotal</SummaryItemText>
              <SummaryItemPrice>$ {totalPrice}</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Tax</SummaryItemText>
              <SummaryItemPrice>$ 30</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Delivery Charges</SummaryItemText>
              <SummaryItemPrice>$ 20</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem type='total'>
              <SummaryItemText>Total</SummaryItemText>
              <SummaryItemPrice>$ {totalPrice}</SummaryItemPrice>
            </SummaryItem>
            <Button>CHECKOUT NOW</Button>
          </Summary>
        </Bottom>
      </Wrapper>
      <Footer />
    </Container>
  );
};

export default Cart;

const ContainerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 8px;
`;

const Controls = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const IconButton = styled.button`
  background: none;
  border: none;
  font-size: 18px;
  cursor: pointer;
  padding: 4px;
  color: #333;

  &:disabled {
    color: #ccc;
    cursor: not-allowed;
  }
`;

const Actions = styled.div`
  display: flex;
  gap: 16px;
  font-size: 12px;
  color: #007bff;
  cursor: pointer;

  span {
    &:hover {
      text-decoration: underline;
    }
  }
`;

const CartItemActions = ({ initialQuantity, onChange, onRemove, onSaveForLater }) => {
  const [quantity, setQuantity] = useState(initialQuantity || 1);

  const handleIncrement = () => {
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);
    onChange(newQuantity);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      const newQuantity = quantity - 1;
      setQuantity(newQuantity);
      onChange(newQuantity);
    }
  };

  return (
    <ContainerWrapper>
      <Controls>
        <IconButton onClick={handleDecrement} disabled={quantity <= 1}>
          –
        </IconButton>
        <Text>{quantity}</Text>
        <IconButton onClick={handleIncrement}>+</IconButton>
      </Controls>
      <Actions>
        <span onClick={onRemove}>Remove</span>
        <LeftDivider />
        <span onClick={onSaveForLater}>Save for Later</span>
      </Actions>
    </ContainerWrapper>
  );
};
