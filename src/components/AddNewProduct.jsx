import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaTag, FaDollarSign, FaBoxOpen, FaPalette, FaPaintBrush, FaRegistered, FaEdit } from 'react-icons/fa';
import toast from 'react-hot-toast';

import Navbar from '../components/Navbar';
import Announcement from './Announcement'; 

const AddNewProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
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

  const URI = 'http://localhost:8080';
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
    await axios
      .post(`${URI}/api/product/add`, product)
      .then((response) => {
        toast.success(response.data.msg, { position: 'top-right' });
        navigate('/admin');
      })
      .catch((error) => {
        console.log(error);
        setErrorMessage('Error updating product. Please try again.');
      });
  };

  return (
    <>
      <Announcement />
      <Navbar />
      <div
        style={{
          background: `linear-gradient(rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.5)), url('https://images.pexels.com/photos/6984650/pexels-photo-6984650.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940') center`,
          backgroundSize: 'cover',
          backgroundAttachment: 'fixed', // Keep the background fixed during scroll
          minHeight: '100vh', // Ensure it covers the full height of the viewport
          paddingTop: '56px', // Adjust for the navbar height if needed
        }}
        className="container"
      >
        <div
          style={{
            background: 'linear-gradient(to bottom right, #ffffff, #e7f1ff)',
            borderRadius: '15px',
            border: '1px solid #ced4da',
            boxShadow: '0 8px 30px rgba(0, 0, 0, 0.2)',
            maxWidth: '800px',
            margin: 'auto',
            padding: '2rem',
            transition: 'transform 0.3s',
            marginTop: '2rem', // Add margin to separate from the top
          }}
          className="form-container shadow p-4"
        >
          <h1 className='text-center mb-4'>ADD NEW PRODUCT</h1>
          {errorMessage && <div className='alert alert-danger'>{errorMessage}</div>}
          <form onSubmit={submitForm}>
            <div className='row'>
              <div className='col-md-6 mb-3'>
                <label htmlFor='name' className='form-label'>
                  <FaTag className='form-icon' /> Name:
                </label>
                <input
                  type='text'
                  name='name'
                  id='name'
                  className='form-control'
                  value={product.name}
                  onChange={inputChangeHandler}
                  required
                />
              </div>
              <div className='col-md-6 mb-3'>
                <label htmlFor='price' className='form-label'>
                  <FaDollarSign className='form-icon' /> Price:
                </label>
                <input
                  type='number'
                  name='price'
                  id='price'
                  className='form-control'
                  value={product.price}
                  onChange={inputChangeHandler}
                  required
                />
              </div>
            </div>
            <div className='row'>
              <div className='col-md-6 mb-3'>
                <label htmlFor='stock' className='form-label'>
                  <FaBoxOpen className='form-icon' /> Stock:
                </label>
                <input
                  type='number'
                  name='stock'
                  id='stock'
                  className='form-control'
                  value={product.stock}
                  onChange={inputChangeHandler}
                  required
                />
              </div>
              <div className='col-md-6 mb-3'>
                <label htmlFor='material' className='form-label'>
                  <FaPalette className='form-icon' /> Material:
                </label>
                <input
                  type='text'
                  name='material'
                  id='material'
                  className='form-control'
                  value={product.material}
                  onChange={inputChangeHandler}
                  required
                />
              </div>
            </div>
            <div className='row'>
              <div className='col-md-6 mb-3'>
                <label htmlFor='color' className='form-label'>
                  <FaPaintBrush className='form-icon' /> Color:
                </label>
                <input
                  type='text'
                  name='color'
                  id='color'
                  className='form-control'
                  value={product.color}
                  onChange={inputChangeHandler}
                  required
                />
              </div>
              <div className='col-md-6 mb-3'>
                <label htmlFor='brand' className='form-label'>
                  <FaRegistered className='form-icon' /> Brand:
                </label>
                <input
                  type='text'
                  name='brand'
                  id='brand'
                  className='form-control'
                  value={product.brand}
                  onChange={inputChangeHandler}
                  required
                />
              </div>
            </div>
            <div className='mb-3'>
              <label htmlFor='description' className='form-label'>
                <FaEdit className='form-icon' /> Description:
              </label>
              <textarea
                name='description'
                id='description'
                className='form-control'
                value={product.description}
                onChange={inputChangeHandler}
                rows='4'
                required
              />
            </div>
            <div className='col-md-6 mb-3'>
              <label htmlFor='length' className='form-label'>
                <FaBoxOpen className='form-icon' /> Length:
              </label>
              <input
                type='number'
                name='length'
                id='length'
                className='form-control'
                value={product.dimensions.length}
                onChange={inputChangeHandler}
                required
              />
            </div>
            <div className='col-md-6 mb-3'>
              <label htmlFor='height' className='form-label'>
                <FaBoxOpen className='form-icon' /> Height:
              </label>
              <input
                type='number'
                name='height'
                id='height'
                className='form-control'
                value={product.dimensions.height}
                onChange={inputChangeHandler}
                required
              />
            </div>
            <div className='col-md-6 mb-3'>
              <label htmlFor='width' className='form-label'>
                <FaBoxOpen className='form-icon' /> Width:
              </label>
              <input
                type='number'
                name='width'
                id='width'
                className='form-control'
                value={product.dimensions.width}
                onChange={inputChangeHandler}
                required
              />
            </div>
            <div className='col-md-6 mb-3'>
              <label htmlFor='imageUrl' className='form-label'>
                <FaBoxOpen className='form-icon' /> Image URL:
              </label>
              <input
                type='string'
                name='imageUrl'
                id='imageUrl'
                className='form-control'
                value={product.imageUrl}
                onChange={inputChangeHandler}
                required
              />
            </div>

            <button
              type='submit'
              className='btn btn-primary btn-lg'
              style={{
                backgroundColor: '#007bff',
                border: 'none',
                borderRadius: '25px',
                padding: '12px 24px',
                fontSize: '16px',
                transition: 'background-color 0.3s, transform 0.2s',
              }}
              onMouseEnter={(e) => (e.target.style.backgroundColor = '#0056b3')}
              onMouseLeave={(e) => (e.target.style.backgroundColor = '#007bff')}
            >
              Add Product
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddNewProduct;
