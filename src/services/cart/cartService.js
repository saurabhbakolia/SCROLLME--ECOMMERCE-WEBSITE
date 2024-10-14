import axios from 'axios';
import { CART_ENDPOINTS } from '../../api/endPoints';
import { createFetchOptions, HttpMethod } from '../../utils/apiConfig';

// Function to add an item to the cart
export const addToCartAPI = async (cartData) => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    },
    withCredentials: true
  };
  return await axios
    .post(CART_ENDPOINTS.ADD_TO_CART, cartData, config)
    .then((response) => {
      console.log("response", response);
      return Promise.resolve(response.data);
    })
    .catch((error) => {
      console.error(error);
      return Promise.reject(error.response.data);
    });
};

// Function to view the user's cart
export const viewCartAPI = async () => {
  return await axios
    .get(CART_ENDPOINTS.VIEW_CART)
    .then((response) => {
      return Promise.resolve(response.data);
    })
    .catch((error) => {
      console.error(error);
      return Promise.reject(error.response.data);
    });
};

// Function to update an item quantity in the cart
export const updateCartItemAPI = async (cartItemData) => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };
  return await axios
    .put(CART_ENDPOINTS.UPDATE_CART_ITEM, cartItemData, config)
    .then((response) => {
      return Promise.resolve(response.data);
    })
    .catch((error) => {
      console.error(error);
      return Promise.reject(error.response.data);
    });
};

// Function to delete an item from the cart
export const deleteCartItemAPI = async (data) => {
  const config = createFetchOptions(HttpMethod.DELETE, true);
  config.data = data;
  console.log("config", config);
  return await axios
    .delete(CART_ENDPOINTS.DELETE_CART_ITEM, config)
    .then((response) => {
      return Promise.resolve(response.data);
    })
    .catch((error) => {
      console.error(error);
      return Promise.reject(error.response.data);
    });
};

// Function to clear the cart
export const clearCartAPI = async () => {
  return await axios
    .delete(CART_ENDPOINTS.CLEAR_CART)
    .then((response) => {
      return Promise.resolve(response.data);
    })
    .catch((error) => {
      console.error(error);
      return Promise.reject(error.response.data);
    });
};
