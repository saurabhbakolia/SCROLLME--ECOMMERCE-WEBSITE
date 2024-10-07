import axios from 'axios';
import { AUTH_ENDPOINTS } from '../../api/endPoints';

export const UserSignInAPI = async (loginData) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
    withCredentials: true, // Include credentials in the request
  };
  const data = loginData;
  return await axios
    .post(`${AUTH_ENDPOINTS.SIGN_IN}`, data, config)
    .then((response) => {
      return Promise.resolve(response.data);
    })
    .catch((error) => {
      console.error(error);
      return Promise.reject(error.response.data);
    });
};
