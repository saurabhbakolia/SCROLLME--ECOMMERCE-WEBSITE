import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Container, TextField, Typography, Snackbar } from '@mui/material';
import { FaTag, FaDollarSign, FaBoxOpen, FaPalette, FaPaintBrush, FaRegistered, FaEdit } from 'react-icons/fa';
import { useToast, Box } from '@chakra-ui/react';
import styled from 'styled-components';
import Navbar from '../components/Navbar';
import Announcement from './Announcement'; 
import { addProductAPI } from '../services/products/productService';

const StyledContainer = styled(Container)`
  background: linear-gradient(to bottom right, #ffffff, #e7f1ff);
  border-radius: 15px;
  border: 1px solid #ced4da;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.2);
  padding: 2rem;
  margin-top: 2rem;
`;

const AddNewProduct = () => {
  
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
    dimensions: {
      width: 0,
      length: 0,
      height: 0,
    },
    material: '',
    color: '',
    ratings: {
      averageRating: 0,
      numberOfReviews: 0,
    },
  };

  const [product, setProduct] = useState(initialProduct);

  const inputChangeHandler = (e) => {
    const { name, value } = e.target;
    if (name === 'length' || name === 'width' || name === 'height') {
      setProduct({ ...product, dimensions: { ...product.dimensions, [name]: value } });
    } else {
      setProduct({ ...product, [name]: value });
    }
  };

  const submitForm = async (e) => {
    e.preventDefault();
    try {
      await addProductAPI(product);
      toast({
        position: 'top-right',
        status: 'success',
        duration: 2000,
        isClosable: true,
        render: () => (
          <Box color='white' p={3} bg='teal' borderRadius={4}>
            Product Added Successfully.
          </Box>
        ),
      });
      setTimeout(() => {
        navigate('/admin');
      }, 2000); 
    } catch (error) {
      console.log(error);
      setErrorMessage('Error updating product. Please try again.');
    }
  };

  return (
    <>
      <Announcement />
      <Navbar />
      <Box
        sx={{
          background: `linear-gradient(rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.5)), url('https://images.pexels.com/photos/6984650/pexels-photo-6984650.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940') center`,
          backgroundSize: 'cover',
          backgroundAttachment: 'fixed',
          minHeight: '100vh',
          pt: '56px',
        }}
      >
        <StyledContainer maxWidth="sm">
          <Typography variant="h4" align="center" gutterBottom>
            ADD NEW PRODUCT
          </Typography>
          {errorMessage && <Snackbar open={true} message={errorMessage} onClose={() => setErrorMessage('')} />}
          <form onSubmit={submitForm}>
            <TextField
              fullWidth
              margin="normal"
              label="Name"
              name="name"
              value={product.name}
              onChange={inputChangeHandler}
              required
              InputProps={{
                startAdornment: <FaTag />,
              }}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Price"
              type="number"
              name="price"
              value={product.price}
              onChange={inputChangeHandler}
              required
              InputProps={{
                startAdornment: <FaDollarSign />,
              }}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Stock"
              type="number"
              name="stock"
              value={product.stock}
              onChange={inputChangeHandler}
              required
              InputProps={{
                startAdornment: <FaBoxOpen />,
              }}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Material"
              name="material"
              value={product.material}
              onChange={inputChangeHandler}
              required
              InputProps={{
                startAdornment: <FaPalette />,
              }}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Color"
              name="color"
              value={product.color}
              onChange={inputChangeHandler}
              required
              InputProps={{
                startAdornment: <FaPaintBrush />,
              }}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Brand"
              name="brand"
              value={product.brand}
              onChange={inputChangeHandler}
              required
              InputProps={{
                startAdornment: <FaRegistered />,
              }}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Description"
              name="description"
              value={product.description}
              onChange={inputChangeHandler}
              required
              multiline
              rows={4}
              InputProps={{
                startAdornment: <FaEdit />,
              }}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Length"
              type="number"
              name="length"
              value={product.dimensions.length}
              onChange={inputChangeHandler}
              required
              InputProps={{
                startAdornment: <FaBoxOpen />,
              }}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Height"
              type="number"
              name="height"
              value={product.dimensions.height}
              onChange={inputChangeHandler}
              required
              InputProps={{
                startAdornment: <FaBoxOpen />,
              }}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Width"
              type="number"
              name="width"
              value={product.dimensions.width}
              onChange={inputChangeHandler}
              required
              InputProps={{
                startAdornment: <FaBoxOpen />,
              }}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Image URL"
              name="imageUrl"
              value={product.imageUrl}
              onChange={inputChangeHandler}
              required
              InputProps={{
                startAdornment: <FaBoxOpen />,
              }}
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{
                borderRadius: '25px',
                padding: '12px 24px',
                fontSize: '16px',
                mt: 2,
              }}
            >
              Add Product
            </Button>
          </form>
        </StyledContainer>
      </Box>
    </>
  );
};

export default AddNewProduct;
