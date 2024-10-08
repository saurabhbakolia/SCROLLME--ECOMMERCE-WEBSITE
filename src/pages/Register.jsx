// Register.js

import React, { useState } from "react";
import styled from "styled-components";
import { UserRegistrationAPI } from "../services/userAPI/registerationAPI";
import { useNavigate } from "react-router-dom";
import { Triangle } from "react-loader-spinner";
import PasswordStrengthBar from "react-password-strength-bar";
import { useToast } from "@chakra-ui/react";
import { mobile, tablet } from "../responsive";

// Styled Components

const LoaderOverlay = styled.div`
  position: fixed; /* Changed to fixed to overlay the entire viewport */
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(255, 255, 255, 0.8); /* Slightly increased opacity for better visibility */
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000; /* Increased z-index to ensure it overlays all content */
`;

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://images.pexels.com/photos/6984661/pexels-photo-6984661.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940")
      center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 40%;
  padding: 40px; /* Increased padding for better spacing */
  background-color: white;
  border-radius: 8px; /* Added border-radius for smoother edges */
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* Added subtle shadow for depth */

  ${tablet`
    width: 60%;
  `}

  ${mobile`
    width: 90%;
    padding: 20px;
  `}
`;

const Title = styled.h1`
  font-size: 28px;
  font-weight: 500;
  margin-bottom: 20px; /* Added margin for spacing below the title */
  text-align: center; /* Centered the title */
  color: #333; /* Changed color for better readability */
`;

const Form = styled.form`
  display: flex;
  flex-direction: column; /* Changed to column for vertical alignment */
`;

const Input = styled.input`
  width: 100%;
  padding: 12px 16px;
  margin: 8px 0;
  border: 1px solid #ccc; /* Added border for inputs */
  border-radius: 4px;
  font-size: 14px;

  &:focus {
    border-color: teal; /* Changed border color on focus */
    outline: none;
    box-shadow: 0 0 5px rgba(0, 128, 128, 0.5); /* Added focus shadow */
  }
`;

const Agreement = styled.span`
  font-size: 14px;
  margin: 16px 0;
  color: #555;
`;

const Text = styled.p`
  font-size: 14px;
  margin: 8px 0;
  color: #555;
`;

const StyledLink = styled.a`
  font-size: 14px;
  color: teal;
  text-decoration: none;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

const Button = styled.button`
  width: 100%;
  border: none;
  padding: 14px 20px;
  background-color: teal;
  color: white;
  font-size: 16px;
  cursor: pointer;
  border-radius: 4px;
  margin-top: 10px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #006666;
  }

  &:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }
`;

const PasswordBox = styled.div`
  width: 100%;
  margin: 8px 0;
`;

// Register Component

const Register = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const toast = useToast(); // Initialized toast for user feedback

  const validateForm = (formData) => {
    const { firstName, lastName, username, password } = formData;

    // Username, Firstname, Lastname Validation
    const namePattern = /^[a-zA-Z]+$/;
    if (firstName.length < 2 || !namePattern.test(firstName)) {
      toast({
        title: "Invalid First Name",
        description: "First name must be at least 2 characters long and contain only letters.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return false;
    }
    if (lastName.length < 2 || !namePattern.test(lastName)) {
      toast({
        title: "Invalid Last Name",
        description: "Last name must be at least 2 characters long and contain only letters.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return false;
    }
    if (username.length < 2) {
      toast({
        title: "Invalid Username",
        description: "Username must be at least 2 characters long.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return false;
    }

    // Password Validation
    const passwordPattern = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-zA-Z]).{8,}$/;
    if (!passwordPattern.test(password)) {
      toast({
        title: "Weak Password",
        description: "Password must be at least 8 characters long, contain at least one digit and one special character.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = {
      firstName: e.target.firstName.value.trim(),
      lastName: e.target.lastName.value.trim(),
      username: e.target.username.value.trim(),
      email: e.target.email.value.trim(),
      password: e.target.password.value,
      confirmPassword: e.target.confirmPassword.value,
    };

    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Password Mismatch",
        description: "Passwords do not match!",
        status: "error",
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

    try {
      const response = await UserRegistrationAPI(formData);
      console.log(response.data);
      toast({
        title: "Registration Successful",
        description: "Your account has been created successfully.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      navigate("/login");
    } catch (error) {
      console.error("Registration Error:", error);
      toast({
        title: "Registration Failed",
        description: error.response?.data?.message || "An error occurred during registration.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  return (
    <>
      {isLoading && (
        <LoaderOverlay>
          <Triangle
            color="teal"
            height={80}
            width={80}
            ariaLabel="triangle-loading"
          />
        </LoaderOverlay>
      )}
      <Container>
        <Wrapper>
          <Title>CREATE AN ACCOUNT</Title>
          <Form onSubmit={handleSubmit}>
            <Input
              type="text"
              name="firstName"
              placeholder="First Name"
              required
              aria-label="First Name"
            />
            <Input
              type="text"
              name="lastName"
              placeholder="Last Name"
              required
              aria-label="Last Name"
            />
            <Input
              type="text"
              name="username"
              placeholder="Username"
              required
              aria-label="Username"
            />
            <Input
              type="email"
              name="email"
              placeholder="Email"
              required
              aria-label="Email"
            />
            <Input
              type="password"
              name="password"
              placeholder="Password"
              required
              onChange={handlePassword}
              aria-label="Password"
            />
            <Input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              required
              aria-label="Confirm Password"
            />
            <PasswordBox>
              <PasswordStrengthBar password={password} />
            </PasswordBox>
            <Agreement>
              By creating an account, I consent to the processing of my personal
              data in accordance with the <b>PRIVACY POLICY</b>.
            </Agreement>
            <Text>
              Already have an account? <StyledLink href="/login">LOGIN</StyledLink>
            </Text>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Creating Account..." : "CREATE ACCOUNT"}
            </Button>
          </Form>
        </Wrapper>
      </Container>
    </>
  );
};

export default Register;
