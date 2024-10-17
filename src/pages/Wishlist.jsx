import React from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromWishlist } from '../store/Slices/WishlistSlice';
import { allProducts } from '../data'; // Import allProducts data
import Navbar from '../components/Navbar';
import Announcement from '../components/Announcement';
import Footer from '../components/Footer';

// Styled components for Wishlist UI
const Container = styled.div`
  margin-top: 100px;
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const ProductCard = styled.div`
  margin: 10px;
  border: 1px solid #e0e0e0;
  border-radius: 10px;
  padding: 20px;
  width: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #fff;
  position: relative;
`;

const Image = styled.img`
  width: 100px;
  height: 100px;
  object-fit: cover;
  margin-bottom: 10px;
`;

const Title = styled.h3`
  font-size: 18px;
  margin: 10px 0;
`;

const Price = styled.p`
  font-size: 16px;
  margin-bottom: 10px;
`;

const RemoveButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: transparent;
  border: none;
  color: red;
  font-size: 20px;
  cursor: pointer;
  &:hover {
    color: darkred;
  }
`;

const MoveToBagButton = styled.button`
  padding: 10px 15px;
  border: 1px solid red;
  background-color: white;
  color: red;
  border-radius: 5px;
  cursor: pointer;
  margin-top: auto;
  &:hover {
    background-color: #f5f5f5;
  }
`;

const EmptyWishlist = styled.p`
  font-size: 20px;
  color: #999;
`;

const Wishlist = () => {
  const dispatch = useDispatch();
  const wishlist = useSelector((state) => state.wishlist); // Access wishlist from state

  // Filter products based on wishlist IDs
  const wishlistItems = allProducts.filter((product) => wishlist.includes(product.id));

  const handleRemoveFromWishlist = (id) => {
    dispatch(removeFromWishlist(id)); // Dispatch action to remove from wishlist
  };

  return (
    <>
      <Navbar />
      <Announcement />
      <Container>
        {wishlistItems.length > 0 ? (
          wishlistItems.map((product) => (
            <ProductCard key={product.id}>
              <RemoveButton onClick={() => handleRemoveFromWishlist(product.id)}>X</RemoveButton>
              <Image src={product.colors[0].img} alt={product.title} />
              <Title>{product.title}</Title>
              <Price>{product.price}</Price>
              <MoveToBagButton>Move to Cart</MoveToBagButton>
            </ProductCard>
          ))
        ) : (
          <EmptyWishlist>Your wishlist is empty.</EmptyWishlist>
        )}
      </Container>
      <Footer />
    </>
  );
};

export default Wishlist;
