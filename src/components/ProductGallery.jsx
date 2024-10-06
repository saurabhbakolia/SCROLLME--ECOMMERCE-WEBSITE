import React, { useState } from 'react';
import ProductCard from './ProductCard';
import { allProducts, productCategories } from '../data';
import styled from 'styled-components';

const ProductGalleryContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 16px;
    padding: 16px;
    justify-items: center;
    align-items: center;
    background-color: #f5fafd;
    min-height: 100vh;
    width: 100%;
    overflow-x: hidden;
    @media only screen and (max-width: 768px) {
        grid-template-columns: repeat(2, 1fr);
    }
    @media only screen and (max-width: 480px) {
        grid-template-columns: repeat(1, 1fr);
    }
`;

const FilterContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
  margin-top: 70px;
`;

const FilterButton = styled.button`
  padding: 10px 20px;
  margin: 0 10px;
  background-color: ${(props) => (props.active ? '#3498db' : '#f0f0f0')};
  color: ${(props) => (props.active ? '#fff' : '#000')};
  border: none;
  cursor: pointer;
  &:hover {
    background-color: #3498db;
    color: white;
  }
`;

const ProductGallery = () => {
  // State to track the selected category
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Categories for filtering
  const categories = ['All', ...productCategories];

  // Filter products based on the selected category
  const filteredProducts =
    selectedCategory === 'All'
      ? allProducts
      : allProducts.filter((product) => product.category === selectedCategory);

  return (
    <React.Fragment>
      <h2>Products Gallery</h2>
      {/* Filter Buttons */}
      <FilterContainer>
        {categories.map((category) => (
          <FilterButton
            key={category}
            active={selectedCategory === category}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </FilterButton>
        ))}
      </FilterContainer>
      {/* Product Cards */}
      <ProductGalleryContainer>
        {filteredProducts.map((product) => (
          <ProductCard product={product} key={product.id} />
        ))}
      </ProductGalleryContainer>
    </React.Fragment>
  );
};

export default ProductGallery;
