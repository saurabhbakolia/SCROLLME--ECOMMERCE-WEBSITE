import styled from 'styled-components';
import Product from './Product';
import { listProductsAPI } from '../services/products/productService';
import { useEffect, useState } from 'react';
import { Box, Spinner, Text } from '@chakra-ui/react';

const Container = styled.div`
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPopularProducts = async () => {
    try {
      const response = await listProductsAPI(1, 10);
      setProducts(response?.products);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPopularProducts();
  }, []);

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
    <Container>
      {products.map((product) => (
        <Product item={product} key={product._id} />
      ))}
    </Container>
  );
};

export default Products;
