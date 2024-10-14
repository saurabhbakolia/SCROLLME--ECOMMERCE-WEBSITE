<<<<<<< HEAD
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
=======
import React, { useEffect, useState } from 'react';
import ProductCard from './ProductCard';
import { listProductsAPI } from '../services/products/productService';
import { Box } from '@mui/material';
import { Button, Heading, HStack, SimpleGrid, Spinner, Text } from '@chakra-ui/react';


const ProductGallery = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const fetchProducts = async (page) => {
    try {
      const response = await listProductsAPI(page);
      setProducts(response.products);
      setTotalPages(response.totalPages);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts(currentPage);
  }, [currentPage]);

  if (loading) {
    return (
      <Box textAlign='center' mt={5}>
        <Spinner size='xl' />
        <Text mt={4}>Loading products...</Text>
      </Box>
    );
  }

  if (error) {
    return (
      <Box textAlign='center' mt={5}>
        <Text color='red.500'>Error fetching products: {error.message}</Text>
      </Box>
    );
  }

  return (
    <React.Fragment>
      <Heading as='h2' size='lg' p={4}>
        Products Gallery
      </Heading>
      <Box p={4} bg='#f5fafd' minHeight='100vh'>
        {loading ? (
          <Box textAlign='center' mt={5}>
            <Spinner size='xl' />
            <Text mt={4}>Loading products...</Text>
          </Box>
        ) : error ? (
          <Box textAlign='center' mt={5}>
            <Text color='red.500'>Error fetching products: {error.message}</Text>
          </Box>
        ) : (
          <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={4} justifyItems='center' alignItems='center' gap={6}>
            {products.map((product) => (
              <ProductCard product={product} key={product._id} />
            ))}
          </SimpleGrid>
        )}

        <HStack spacing={4} mt={6} justify='center'>
          <Button onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))} isDisabled={currentPage === 1}>
            Previous
          </Button>
          <Text>
            Page {currentPage} of {totalPages}
          </Text>
          <Button onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))} isDisabled={currentPage === totalPages}>
            Next
          </Button>
        </HStack>
      </Box>
>>>>>>> 4c1e8470e1be82066fd0c6b64977ac62146ada7a
    </React.Fragment>
  );
};

export default ProductGallery;
