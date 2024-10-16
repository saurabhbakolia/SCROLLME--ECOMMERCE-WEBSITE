import { AUTH_STATUS } from "../../api/endPoints";
import { createFetchOptions } from "../../utils/apiConfig";
import axios from 'axios';

export const checkAuthStatusAPI = async () => {
    const config = createFetchOptions('GET', true);
    return await axios
        .get(AUTH_STATUS.AUTH_STATUS, config)
        .then((response) => {
            return Promise.resolve(response.data);
        })
        .catch((error) => {
            console.error(error.message);
            return Promise.reject(error.data);
        });
};