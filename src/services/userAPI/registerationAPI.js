import axios from 'axios';
import { AUTH_ENDPOINTS } from '../../api/endPoints';

export const UserRegistrationAPI = async (userData) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const data = userData;
  return await axios
    .post(`${AUTH_ENDPOINTS.SIGN_UP}`, data, config)
    .then((response) => {
      console.log("response: " + JSON.stringify(response));
      return Promise.resolve(response.data);
    })
    .catch((error) => {
      console.error(error);
      return Promise.reject(error.response.data);
    });
};
