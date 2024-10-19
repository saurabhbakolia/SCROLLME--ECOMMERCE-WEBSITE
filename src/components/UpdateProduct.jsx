import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaTag, FaDollarSign, FaBoxOpen, FaPalette, FaPaintBrush, FaRegistered, FaEdit } from 'react-icons/fa';
import './UpdateProduct.css';
import toast from 'react-hot-toast';

const UpdateProduct = () => {
  const { id } = useParams();
  console.log(id);
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
  const [product, setProduct] = useState(initialProduct);

  const inputChangeHandler = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/product/${id}`)
      .then((response) => {
        setProduct(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  const submitForm = async (e) => {
    e.preventDefault();
    console.log('HELLO');
    await axios
      .put(`http://localhost:8080/api/product/update/${id}`, product)
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
    <div className='container mt-5'>
      <div className='form-container shadow p-4'>
        <h1 className='text-center mb-4'>Update Product</h1>
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
            <label htmlFor='stock' className='form-label'>
              <FaBoxOpen className='form-icon' /> length:
            </label>
            <input
              type='number'
              name='stock'
              id='stock'
              className='form-control'
              value={product.dimensions.length}
              onChange={inputChangeHandler}
              required
            />
          </div>
          <div className='col-md-6 mb-3'>
            <label htmlFor='stock' className='form-label'>
              <FaBoxOpen className='form-icon' /> Height:
            </label>
            <input
              type='number'
              name='stock'
              id='stock'
              className='form-control'
              value={product.dimensions.height}
              onChange={inputChangeHandler}
              required
            />
          </div>
          <div className='col-md-6 mb-3'>
            <label htmlFor='stock' className='form-label'>
              <FaBoxOpen className='form-icon' /> Width:
            </label>
            <input
              type='number'
              name='stock'
              id='stock'
              className='form-control'
              value={product.dimensions.width}
              onChange={inputChangeHandler}
              required
            />
          </div>
          <div className='col-md-6 mb-3'>
            <label htmlFor='stock' className='form-label'>
              <FaBoxOpen className='form-icon' /> Image URL:
            </label>
            <input
              type='string'
              name='stock'
              id='stock'
              className='form-control'
              value={product.imageUrl}
              onChange={inputChangeHandler}
              required
            />
          </div>

          <button type='submit' className='btn btn-primary btn-lg'>
            Update Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateProduct;
