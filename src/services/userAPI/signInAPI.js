import axios from 'axios';
import { AUTH_ENDPOINTS } from '../../api/endPoints';

export const UserSignInAPI = async (loginData) => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    },
    withCredentials: true // Include credentials in the request
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

// export const UserLogoutAPI = async (token) => {
//     console.log("error");
//     const config = {
//         headers: {
//             "Content-Type": "application/json",
//             "Authorization": `Bearer ${token}` // Include Bearer token in the header
//         },
//         withCredentials: true // Include credentials in the request
//     };

//     return (
//         await axios.delete(`${AUTH_ENDPOINTS.LOGOUT}`, config) // Use DELETE request
//             .then(response => {
//                 return Promise.resolve(response.data); // Resolve if logout is successful
//             })
//             .catch(error => {
//                 console.error(error);
//                 return Promise.reject(error.response?.data || "Error logging out"); // Reject if there's an error
//             })
//     );
// };
