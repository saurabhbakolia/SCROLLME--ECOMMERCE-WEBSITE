// hooks/useAuthCheck.js
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { changeAuthenticated } from '../store/slices/UserSlice';
import { useNavigate } from 'react-router-dom';
import { checkAuthStatusAPI } from '../services/auth/authService';

const useAuthCheck = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const response = await checkAuthStatusAPI();
        console.log('auth status response', response);
        let isAuthenticated = false;
        if (response.status === 200 && response.data.message === 'Authenticated') {
          // User is authenticated, do nothing.
          return;
        } else {
          if (isAuthenticated) {
            dispatch(changeAuthenticated(false));
            navigate('/login');
          }
        }
      } catch (error) {
        console.error('Error checking auth status:', error);
        if (error.response && error.response.status === 401) {
          dispatch(changeAuthenticated(false));
          navigate('/login');
        } else {
          dispatch(changeAuthenticated(false));
        }
      }
    };

    checkAuthStatus();
    const intervalId = setInterval(checkAuthStatus, 120000);
    return () => clearInterval(intervalId);
  }, [dispatch, navigate]);
};

export default useAuthCheck;
