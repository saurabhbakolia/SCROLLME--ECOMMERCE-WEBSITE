import axios from 'axios';
import { PRODUCT_ENDPOINTS } from '../../api/endPoints'; // Adjust the path as needed

// Function to add a new product
export const addProductAPI = async (productData) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  return await axios
    .post(PRODUCT_ENDPOINTS.ADD_PRODUCT, productData, config)
    .then((response) => {
      return Promise.resolve(response.data);
    })
    .catch((error) => {
      console.error(error);
      return Promise.reject(error.response.data);
    });
};

// Function to list all products with pagination
export const listProductsAPI = async (page = 1, limit = 40) => {
  return await axios
    .get(PRODUCT_ENDPOINTS.LIST_PRODUCTS, {
      params: { page, limit },
    })
    .then((response) => {
      return Promise.resolve(response.data);
    })
    .catch((error) => {
      console.error(error);
      return Promise.reject(error.response.data);
    });
};

// Function to get product details by ID
export const getProductByIdAPI = async (productId) => {
  return await axios
    .get(PRODUCT_ENDPOINTS.GET_PRODUCT_BY_ID(productId))
    .then((response) => {
      return Promise.resolve(response?.data);
    })
    .catch((error) => {
      console.error(error);
      return Promise.reject(error?.response?.data);
    });
};

// Function to update a product by ID
export const updateProductAPI = async (productId, productData) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  return await axios
    .put(PRODUCT_ENDPOINTS.UPDATE_PRODUCT(productId), productData, config)
    .then((response) => {
      return Promise.resolve(response.data);
    })
    .catch((error) => {
      console.error(error);
      return Promise.reject(error.response.data);
    });
};

// Function to delete a product by ID
export const deleteProductAPI = async (productId) => {
  return await axios
    .delete(PRODUCT_ENDPOINTS.DELETE_PRODUCT(productId))
    .then((response) => {
      return Promise.resolve(response.data);
    })
    .catch((error) => {
      console.error(error);
      return Promise.reject(error.response.data);
    });
};
