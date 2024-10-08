import React from 'react';
import styled from 'styled-components';
import { LazyLoadImage } from 'react-lazy-load-image-component';

export const renderStars = (rating) => {
  const stars = [];
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;

  // Full stars
  for (let i = 0; i < fullStars; i++) {
    stars.push(<Star key={`full-${i}`}>&#9733;</Star>); // Filled star
  }

  // Half star
  if (hasHalfStar) {
    stars.push(<Star key="half">&#9734;</Star>);
  }

  // Empty stars
  for (let i = stars.length; i < 5; i++) {
    stars.push(<Star key={`empty-${i}`}>&#9734;</Star>); // Empty star
  }

  return stars;
};

const ProductCard = (props) => {
  const handleProductClick = (id, category) => {
    window.open(`/${category}/${id}`, '_blank');
  };

  return (
    <Container onClick={() => handleProductClick(props.product._id, props.product.category)}>
      <LazyLoadImage
        src={props.product.imageUrl}
        width={'100%'}
        height={'100%'}
        alt={props.product.name}
        placeholderSrc={<Placeholder />}
      />
      <Info>
        <ProductBrand>{props.product.brand}</ProductBrand>
        <ProductTitle>{props.product.name}</ProductTitle>
        <ProductDescription>
          {props.product.description.substring(0, 100)}...
        </ProductDescription>
        <ProductRating>
          <div>{renderStars(props.product.ratings.averageRating)}</div>
          <p>({props.product.ratings.numberOfReviews} reviews)</p>
        </ProductRating>
        <ProductPrice>$ {props.product.price.toFixed(2)}</ProductPrice>
        {props.product.stock < 10 ? (
          <ProductStock>
            <ProductStockInfo stock={props.product.stock}>
              {props.product.stock > 0
                ? `Only ${props.product.stock} left in stock.`
                : 'Out of Stock'}
            </ProductStockInfo>
          </ProductStock>
        ) : null}
      </Info>
    </Container>
  );
};

export default ProductCard;

const Container = styled.div`
  background-color: #fff;
  min-width: 280px;
  max-width: 360px;
  height: auto;
  padding: 2px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  transition:
    transform 0.2s,
    box-shadow 0.2s;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  }
`;

const Info = styled.div`
  width: 100%;
  padding-block: 4px;
  padding-inline: 6px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  gap: 4px;
  text-align: left;

  h4 {
    cursor: pointer;
  }
`;

const ProductPrice = styled.h3`
  font-size: 18px;
  font-weight: 600;
`;

const ProductRating = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 10px;

  p {
    font-size: 14px;
    color: #777;
    font-weight: bold;
  }
`;

const ProductStock = styled.div`
  padding: 2px;
  color: ${(props) => (props.children === 'In Stock' ? 'green' : 'red')};
`;

const ProductStockInfo = styled.p`
  color: ${(props) => (props.stock < 5 ? 'red' : 'gray')};
  font-weight: 500;
  font-size: 12px;
`;

const Placeholder = styled.div`
  aspect-ratio: 1/1;
  width: 96%;
  height: 72%;
  background-color: #e0e0e0; // Light gray color for the placeholder
  display: flex;
  align-items: center;
  justify-content: center;
  margin: auto;
`;

const ProductBrand = styled.h2`
  font-size: 14px;
  font-weight: 600;
  color: teal;
`;

const ProductTitle = styled.h2`
  font-size: 24px;
  font-weight: 600;
`;

const ProductDescription = styled.p`
  font-size: 18px;
  font-weight: 400px;
`;

const Star = styled.span`
  color: gold; // Or any color you prefer for the stars
  font-size: 20px; // Adjust size as needed
`;
