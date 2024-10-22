import axios from 'axios';
import { AUTH_ENDPOINTS } from '../../api/endPoints';
import { createFetchOptions, HttpMethod } from '../../utils/apiConfig';

export const UserSingOutAPI = async () => {
  const config = createFetchOptions(HttpMethod.POST, true);
  return await axios
    .post(`${AUTH_ENDPOINTS.LOGOUT}`, config)
    .then((response) => {
      return Promise.resolve(response);
    })
    .catch((error) => {
      console.error(error);
      return Promise.reject(error?.response?.data);
    });
};
