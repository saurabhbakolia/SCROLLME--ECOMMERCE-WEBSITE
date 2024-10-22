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
      setProducts(response?.products);
      setTotalPages(response?.totalPages);
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
    </React.Fragment>
  );
};

export default ProductGallery;
