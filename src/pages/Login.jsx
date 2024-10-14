import styled from 'styled-components';
import { UserSignInAPI } from '../services/userAPI/signInAPI'; // Ensure this is defined
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { changeAuthenticated } from '../store/slices/userSlice';
import { mobile, tablet } from '../responsive';
import { useToast } from '@chakra-ui/react';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'; // Import user creation method
import { auth } from '../context/Firebase'; // Update import
import { FaGoogle } from 'react-icons/fa'; // Add this import

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background:
    linear-gradient(rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.5)),
    url('https://images.pexels.com/photos/6984650/pexels-photo-6984650.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940') center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 25%;
  ${mobile({ width: '84%;' })}
  ${tablet({ width: '84%;' })}
    padding: 20px;
  background-color: white;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 10px 0;
  padding: 10px;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
  margin-bottom: 10px;
`;

const Link = styled.a`
  margin: 5px 0px;
  font-size: 12px;
  text-decoration: underline;
  cursor: pointer;
`;

const GoogleButton = styled(Button)`
  background-color: #4285f4; /* Google blue color */
  width: 100%; /* Full width */
`;

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const toast = useToast();
  const googleProvider = new GoogleAuthProvider();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const loginData = {
      username: e.target.username.value,
      password: e.target.password.value
    };
    try {
      const response = await UserSignInAPI(loginData); // Ensure this is defined
      toast({
        title: 'Login Successful',
        description: response.message || 'You have successfully logged in. Welcome back!',
        status: 'success',
        duration: 5000,
        isClosable: true
      });
      dispatch(changeAuthenticated(true));
      navigate('/');
    } catch (error) {
      toast({
        title: 'Login Failed!',
        description: 'Invalid credentials, please try again.',
        status: 'error',
        duration: 5000,
        isClosable: true
      });
      console.log(error);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider); // Use auth from Firebase context
      const user = result.user;
      toast({
        title: 'Google Login Successful',
        description: `Welcome ${user.displayName}!`,
        status: 'success',
        duration: 5000,
        isClosable: true
      });
      dispatch(changeAuthenticated(true));
      navigate('/');
    } catch (error) {
      toast({
        title: 'Google Login Failed!',
        description: 'Please try again later.',
        status: 'error',
        duration: 5000,
        isClosable: true
      });
      console.log(error);
    }
  };

  return (
    <Container>
      <Wrapper>
        <Title>SIGN IN</Title>
        <Form onSubmit={(e) => handleSubmit(e)}>
          <Input placeholder='username' name='username' type='text' required />
          <Input placeholder='password' name='password' type='password' required />
          <Button type='submit'>LOGIN</Button>
          <Link>DO NOT YOU REMEMBER THE PASSWORD?</Link>
          <Link href='/register'>CREATE A NEW ACCOUNT</Link>
        </Form>
        <GoogleButton onClick={handleGoogleLogin}>
          <FaGoogle style={{ marginRight: '8px' }} /> Sign in with Google
        </GoogleButton>
      </Wrapper>
    </Container>
  );
};

export default Login;
