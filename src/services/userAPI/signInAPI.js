import axios from "axios";
import { API_BASE_URL } from "../../common/constants/apiConstants";

export const UserSignInAPI = async (loginData) => {
    const config = {
        headers: {
            "Content-Type": "application/json",
        }
    };
    const data = loginData;
    return (
        await axios.post(API_BASE_URL + "/auth/user/sign_in", data, { withCredentials: true })
            .then(response => {
                return Promise.resolve(response);
            })
            .catch(error => {
                if (error.response.status === 401) {
                    return Promise.reject(error.response.data.message);
                }
                return Promise.reject(error);
            })
    );
};