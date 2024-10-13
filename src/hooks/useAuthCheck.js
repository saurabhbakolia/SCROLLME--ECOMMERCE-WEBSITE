// hooks/useAuthCheck.js
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { changeAuthenticated } from '../store/slices/userSlice';
import { API_BASE_URL } from '../api/endPoints';
import { useNavigate } from 'react-router-dom';

const useAuthCheck = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/auth/check`, {
          withCredentials: true,
        });
        let isAuthenticated = false;
        if(response.status === 200 && response.data.message === "Authenticated"){
          isAuthenticated = true;
        }
        dispatch(changeAuthenticated(isAuthenticated));

        if (!isAuthenticated && isAuthenticated !== undefined) {
          navigate('/login');
        }
      } catch (error) {
        console.error('Error checking auth status:', error);

        // Handle token expiration or server errors
        if (error.response && error.response.status === 401) {
          // Token expired or invalid
          dispatch(changeAuthenticated(false));
          navigate('/login');
        } else {
          // General error handling
          dispatch(changeAuthenticated(false));
        }
      }
    };

    // Check auth status on component mount
    checkAuthStatus();

    // Set up an interval to check auth status every 2 minutes (120,000 ms)
    const intervalId = setInterval(checkAuthStatus, 120000);

    // Clear the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, [dispatch, navigate]);
};

export default useAuthCheck;
