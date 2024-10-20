export const API_BASE_URL = 'http://localhost:8080/api';

export const AUTH_ENDPOINTS = {
  SIGN_IN: `${API_BASE_URL}/auth/login`,
  SIGN_UP: `${API_BASE_URL}/auth/register`,
  LOGOUT: `${API_BASE_URL}/auth/logout`,
};

export const PRODUCT_ENDPOINTS = {
  ADD_PRODUCT: `${API_BASE_URL}/product/add`,
  LIST_PRODUCTS: `${API_BASE_URL}/product/list`,
  GET_PRODUCT_BY_ID: (productId) => `${API_BASE_URL}/product/${productId}`,
  UPDATE_PRODUCT: (productId) => `${API_BASE_URL}/product/update/${productId}`,
  DELETE_PRODUCT: (productId) => `${API_BASE_URL}/product/delete/${productId}`,
};

export const CART_ENDPOINTS = {
  ADD_TO_CART: `${API_BASE_URL}/cart/add`,
  VIEW_CART: `${API_BASE_URL}/cart/view`,
  UPDATE_CART_ITEM: `${API_BASE_URL}/cart/update`,
  DELETE_CART_ITEM: `${API_BASE_URL}/cart/delete`,
  CLEAR_CART: `${API_BASE_URL}/cart/clear`,
};

export const AUTH_STATUS = {
  AUTH_STATUS: `${API_BASE_URL}/auth/status`,
};
