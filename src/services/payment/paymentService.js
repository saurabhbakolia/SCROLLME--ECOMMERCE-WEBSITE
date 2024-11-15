import axios from 'axios';
import { PAYMENT_ENDPOINTS } from '../../api/endPoints';
import { createFetchOptions, HttpMethod } from '../../utils/apiConfig';

// Function to payment gateway
export const paymentGatewayAPI = async () => {
  const config = createFetchOptions(HttpMethod.POST, true);
  return await axios
    .post(PAYMENT_ENDPOINTS.PAYMENT_GATEWAY, config)
    .then((response) => {
      return Promise.resolve(response.data);
    })
    .catch((error) => {
      console.error(error);
      return Promise.reject(error.response.data);
    });
};
