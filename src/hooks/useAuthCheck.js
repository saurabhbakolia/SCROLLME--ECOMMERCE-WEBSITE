// hooks/useAuthCheck.js
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { changeAuthenticated } from '../store/slices/userSlice';
import { useNavigate } from 'react-router-dom';
import { checkAuthStatusAPI } from '../services/auth/authService';

const useAuthCheck = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const response = await checkAuthStatusAPI();
        let isAuthenticated = false;
        if (response?.status === 200 && response?.data?.message === 'Authenticated') {
          // User is authenticated, do nothing.
          return;
        } else {
          if (isAuthenticated) {
            dispatch(changeAuthenticated(false));
            navigate('/login');
          }
        }
      } catch (error) {
        // Handle different types of errors more safely
        if (error?.response) {
          // Error response from server
          if (error?.response?.status === 401) {
            dispatch(changeAuthenticated(false));
            navigate('/login');
          }
        } else if (error?.request) {
          // No response was received from the server (e.g., network error)
          console.error('Network error:', error?.request);
        } else {
          // Error occurred during setup (e.g., bad configuration)
          console.error('Error in request setup:', error?.message);
        }
        // In any case, mark as not authenticated
        dispatch(changeAuthenticated(false));
      }
    };

    checkAuthStatus();
    const intervalId = setInterval(checkAuthStatus, 120000); // Check every 2 minutes
    return () => clearInterval(intervalId);
  }, [dispatch, navigate]);
};

export default useAuthCheck;
