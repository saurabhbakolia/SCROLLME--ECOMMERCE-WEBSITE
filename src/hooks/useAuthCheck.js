// hooks/useAuthCheck.js
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { changeAuthenticated } from '../store/Slices/UserSlice';
import { API_BASE_URL } from '../common/constants/apiConstants';
import { useNavigate } from 'react-router-dom';

const useAuthCheck = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        const checkAuthStatus = async () => {
            try {
                const response = await axios.get(API_BASE_URL + '/api/auth/check', { withCredentials: true });
                dispatch(changeAuthenticated(response.data.isAuthenticated));
                if (!response.data.isAuthenticated) {
                    navigate('/login');
                }
            } catch (error) {
                console.error('Error checking auth status:', error);
                dispatch(changeAuthenticated(false));
            }
        };

        // Check auth status on component mount
        checkAuthStatus();

        // Set up an interval to check auth status every 2 minutes
        const intervalId = setInterval(checkAuthStatus, 2 * 60 * 1000);

        // Clear the interval when the component unmounts
        return () => clearInterval(intervalId);
    }, [dispatch]);

    // Optionally, you can return the auth status if you need to use it directly in your components
    // const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
    // return isAuthenticated;
};

export default useAuthCheck;
