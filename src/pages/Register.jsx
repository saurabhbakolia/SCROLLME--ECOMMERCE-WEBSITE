import styled from 'styled-components';
import { UserRegistrationAPI } from '../services/userAPI/registerationAPI';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { changeAuthenticated } from '../store/slices/userSlice';
import { Triangle } from 'react-loader-spinner';
import { mobile, tablet } from '../responsive';
import PasswordStrengthBar from 'react-password-strength-bar';
import { useToast } from '@chakra-ui/react';
import Logo from '../components/Logo';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../context/Firebase';
import { FaGoogle } from 'react-icons/fa';

const LoaderOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(255, 255, 255, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
`;

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background:
    linear-gradient(rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.5)),
    url('https://images.pexels.com/photos/6984661/pexels-photo-6984661.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940') center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Box = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  padding: 6px;
`;

const Wrapper = styled.div`
  width: 40%;
  ${mobile({ width: '84%;' })}
  ${tablet({ width: '84%;' })}
    ${mobile({ maxWidth: '760px' })}
    padding: 20px;
  background-color: white;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`;

const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 20px 10px 0px 0px;
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
`;

const Agreement = styled.span`
  font-size: 12px;
  margin: 20px 0px;
`;

const Text = styled.p`
  font-size: 12px;
`;

const Link = styled.a`
  font-size: 12px;
  margin: 5px 0px;
  text-decoration: underline;
  cursor: pointer;
  &:hover {
    color: blue;
  }
`;

const Button = styled.button`
  width: 100%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
  transition: transform 0.3s ease;
  &:hover {
    transform: scale(1.05);
  }
`;

const PasswordBox = styled.div`
  width: 100%;
  padding: 2px 4px;
  height: fit-content;
`;
const GoogleButton = styled(Button)`
  background-color: #4285f4;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.05);
  }
`;
const Register = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const toast = useToast();
  const dispatch = useDispatch();
  const googleProvider = new GoogleAuthProvider();

  const validateForm = (formData) => {
    const { firstName, lastName, username, password } = formData;
    const namePattern = /^[a-zA-Z]+$/;
    if (firstName.length < 2 || !namePattern.test(firstName)) {
      // alert(
      //   'First name must be at least 2 characters long and contain only letters.'
      // );
      toast({
        title: 'Invalid First Name',
        description: 'First name must be at least 2 characters long and contain only letters.',
        status: 'warning',
        duration: 5000,
        isClosable: true,
      });
      return false;
    }
    if (lastName.length < 2 || !namePattern.test(lastName)) {
      // alert(
      //   'Last name must be at least 2 characters long and contain only letters.'
      // );
      toast({
        title: 'Invalid Last Name',
        description: 'Last name must be at least 2 characters long and contain only letters.',
        status: 'warning',
        duration: 5000,
        isClosable: true,
      });
      return false;
    }
    if (username.length < 2) {
      // alert('Username must be at least 2 characters long.');
      toast({
        title: 'Invalid Username',
        description: 'Username must be at least 2 characters long.',
        status: 'warning',
        duration: 5000,
        isClosable: true,
      });
      return false;
    }

    // Password Validation
    const passwordPattern = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-zA-Z]).{8,}$/;
    if (!passwordPattern.test(password)) {
      // alert(
      //   'Password must be at least 8 characters long, contain at least one digit and one special character.'
      // );
      toast({
        title: 'Invalid Password',
        description: 'Password must be at least 8 characters long, contain at least one digit and one special character.',
        status: 'warning',
        duration: 5000,
        isClosable: true,
      });
      return false;
    }

    return true;
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider); // Use auth from Firebase context
      const user = result.user;
      toast({
        title: 'Google Registration Successful',
        description: `Welcome ${user.displayName}!`,
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      dispatch(changeAuthenticated(true));
      navigate('/');
    } catch (error) {
      toast({
        title: 'Google Registration Failed!',
        description: 'Please try again later.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const formData = {
      firstName: e.target.firstName.value,
      lastName: e.target.lastName.value,
      username: e.target.username.value,
      email: e.target.email.value,
      password: e.target.password.value,
      confirmPassword: e.target.confirmPassword.value,
    };

    if (formData.password !== formData.confirmPassword) {
      toast({
        title: 'Password Mismatch!',
        description: 'Passwords do not match, change the password!.',
        status: 'warning',
        duration: 5000,
        isClosable: true,
      });
      setIsLoading(false);
      return;
    }
    // Form validation
    if (!validateForm(formData)) {
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    try {
      const res = await UserRegistrationAPI(formData);
      toast({
        title: 'Registration Successful!',
        description: res.message || 'You have successfully registered. Welcome!',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      console.error(error);
      toast({
        title: 'Registration Failed!',
        description: error || 'An error occurred during registration.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setTimeout(() => {
        setIsLoading(false);
      }, 500);
    }
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  return (
    <>
      {isLoading && (
        <LoaderOverlay>
          <Triangle color='teal' height={80} width={80} ariaLabel='triangle-loading' />
        </LoaderOverlay>
      )}
      <Container>
        <Wrapper>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', fontWeight: 'bold' }}>
            {' '}
            <Logo />{' '}
          </div>
          <br />
          <Title>CREATE AN ACCOUNT</Title>
          <Form onSubmit={(e) => handleSubmit(e)}>
            <Input type='text' name='firstName' placeholder='first name' required />
            <Input type='text' name='lastName' placeholder='last name' required />
            <Input type='text' name='username' placeholder='username' required />
            <Input type='email' name='email' placeholder='email' required />
            <Input type='password' name='password' placeholder='password' required onChange={(e) => handlePassword(e)} />
            <Input type='password' name='confirmPassword' placeholder='confirm password' required />
            <PasswordBox>
              <PasswordStrengthBar password={password} />
            </PasswordBox>
            <Box>
              <Agreement>
                By creating an account, I consent to the processing of my personal data in accordance with the <b>PRIVACY POLICY</b>
              </Agreement>
              <Text>
                Already have an account? <Link href='/login'>LOGIN</Link>
              </Text>
            </Box>
            <Button type='submit'>CREATE</Button>
          </Form>
          <br></br>
          <GoogleButton onClick={handleGoogleLogin}>
            <FaGoogle style={{ marginRight: '8px' }} /> Sign in with Google
          </GoogleButton>
        </Wrapper>
      </Container>
    </>
  );
};

export default Register;
