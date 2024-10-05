import axios from "axios";
import { API_BASE_URL } from "../../common/constants/apiConstants";

export const UserRegistrationAPI = async (userData) => {
    const config = {
        headers: {
            "Content-Type": "application/json",
        }
    };
    const data = userData;
    return (
        await axios.post(API_BASE_URL + "/api/auth/user/register", data)
            .then(response => {
                return Promise.resolve(response);
            })
            .catch(error => {
                if(error.response.status === 409){
                    return Promise.reject(error.response.data.message);
                }
                return Promise.reject(error);
            })
    );

};