import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FaTag, FaDollarSign, FaBoxOpen, FaPalette, FaPaintBrush, FaRegistered, FaEdit } from 'react-icons/fa'; // Updated import
import {
  useToast,
  ChakraProvider,
  Box,
  Button,
  Input,
  Textarea,
  FormControl,
  FormLabel,
  Flex,
  Heading,
  Alert,
  AlertIcon,
} from '@chakra-ui/react';
import styled from '@emotion/styled';
import { updateProductAPI, getProductByIdAPI } from '../services/products/productService';
import Navbar from '../components/Navbar';
import Announcement from './Announcement';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background:
    linear-gradient(rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.5)),
    url('https://images.pexels.com/photos/6984650/pexels-photo-6984650.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940') center/cover;
`;

const FormContainer = styled(Box)`
  background: linear-gradient(to bottom right, #ffffff, #e7f1ff);
  border-radius: 15px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.2);
  max-width: 800px;
  padding: 2rem;
  margin: auto;
  transition: transform 0.3s;
  &:hover {
    transform: scale(1.02);
  }
`;

const IconWrapper = styled.span`
  margin-right: 0.5rem;
  color: #007bff;
  vertical-align: middle;
`;

const UpdateProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const toast = useToast();
  const [errorMessage, setErrorMessage] = useState('');

  const initialProduct = {
    name: '',
    description: '',
    price: 0,
    category: '',
    imageUrl: '',
    brand: '',
    weight: 0,
    dimensions: { width: 0, length: 0, height: 0 },
    material: '',
    color: '',
    ratings: { averageRating: 0, numberOfReviews: 0 },
    stock: 0,
  };

  const [product, setProduct] = useState(initialProduct);

  const inputChangeHandler = (e) => {
    const { name, value } = e.target;
    if (['length', 'width', 'height'].includes(name)) {
      setProduct({ ...product, dimensions: { ...product.dimensions, [name]: value } });
    } else {
      setProduct({ ...product, [name]: value });
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await getProductByIdAPI(id);
      setProduct(data);
    };
    fetchData();
  }, [id]);

  const submitForm = async (e) => {
    e.preventDefault();
    try {
      await updateProductAPI(id, product);
      toast({
        position: 'top-right',
        status: 'success',
        duration: 2000,
        isClosable: true,
        render: () => (
          <Box color='white' p={3} bg='teal' borderRadius={4}>
            Product Updated Successfully.
          </Box>
        ),
      });
      setTimeout(() => {
        navigate('/admin');
      }, 2000);
    } catch (error) {
      toast({
        title: 'Error in Updating the product',
        status: 'success',
        duration: 5000,
        isClosable: true,
        position: 'top-right',
      });
    }
    setErrorMessage(error);
  };

  return (
    <ChakraProvider>
      <Announcement />
      <Navbar />
      <br></br>
      <br></br>

      <Container>
        <FormContainer as='form' onSubmit={submitForm}>
          <Heading as='h1' textAlign='center' mb={4}>
            Update Product
          </Heading>
          {errorMessage && (
            <Alert status='error' mb={4}>
              <AlertIcon />
              {errorMessage}
            </Alert>
          )}
          <Flex direction='column' gap={4}>
            <FormControl>
              <FormLabel>
                <IconWrapper>
                  <FaTag />
                </IconWrapper>
                Name
              </FormLabel>
              <Input type='text' name='name' value={product.name} onChange={inputChangeHandler} required />
            </FormControl>
            <FormControl>
              <FormLabel>
                <IconWrapper>
                  <FaDollarSign />
                </IconWrapper>
                Price
              </FormLabel>
              <Input type='number' name='price' value={product.price} onChange={inputChangeHandler} required />
            </FormControl>
            <FormControl>
              <FormLabel>
                <IconWrapper>
                  <FaBoxOpen />
                </IconWrapper>
                Stock
              </FormLabel>
              <Input type='number' name='stock' value={product.stock} onChange={inputChangeHandler} required />
            </FormControl>
            <FormControl>
              <FormLabel>
                <IconWrapper>
                  <FaPalette />
                </IconWrapper>
                Material
              </FormLabel>
              <Input type='text' name='material' value={product.material} onChange={inputChangeHandler} required />
            </FormControl>
            <FormControl>
              <FormLabel>
                <IconWrapper>
                  <FaPaintBrush />
                </IconWrapper>
                Color
              </FormLabel>
              <Input type='text' name='color' value={product.color} onChange={inputChangeHandler} required />
            </FormControl>
            <FormControl>
              <FormLabel>
                <IconWrapper>
                  <FaRegistered />
                </IconWrapper>
                Brand
              </FormLabel>
              <Input type='text' name='brand' value={product.brand} onChange={inputChangeHandler} required />
            </FormControl>
            <FormControl>
              <FormLabel>
                <IconWrapper>
                  <FaEdit />
                </IconWrapper>
                Description
              </FormLabel>
              <Textarea name='description' value={product.description} onChange={inputChangeHandler} rows='4' required />
            </FormControl>
            <Flex gap={4}>
              <FormControl>
                <FormLabel>Length</FormLabel>
                <Input type='number' name='length' value={product.dimensions.length} onChange={inputChangeHandler} required />
              </FormControl>
              <FormControl>
                <FormLabel>Width</FormLabel>
                <Input type='number' name='width' value={product.dimensions.width} onChange={inputChangeHandler} required />
              </FormControl>
              <FormControl>
                <FormLabel>Height</FormLabel>
                <Input type='number' name='height' value={product.dimensions.height} onChange={inputChangeHandler} required />
              </FormControl>
            </Flex>
            <Button type='submit' colorScheme='blue' w='full' mt={4}>
              Update Product
            </Button>
          </Flex>
        </FormContainer>
      </Container>
    </ChakraProvider>
  );
};

export default UpdateProduct;
