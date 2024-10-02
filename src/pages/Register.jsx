import styled from "styled-components";

import { UserRegistrationAPI } from "../services/userAPI/registerationAPI";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Triangle } from "react-loader-spinner";

import { mobile, tablet } from "../responsive";
import PasswordStrengthBar from "react-password-strength-bar";

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
  ${mobile({ width: "84%;" })}
  ${tablet({ width: "84%;" })}
    ${mobile({ maxWidth: "760px" })}
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
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
`;

const PasswordBox = styled.div`
  width: 100%;
  padding: 2px 4px;
  height: fit-content;
`;

const Register = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    console.log("Inside the handleSubmit function");
    const formData = {
      firstName: e.target.firstName.value,
      lastName: e.target.lastName.value,
      username: e.target.username.value,
      email: e.target.email.value,
      password: e.target.password.value,
      confirmPassword: e.target.confirmPassword.value,
    };

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      setIsLoading(false);
      return;
    }
    setIsLoading(true);
    try {
      const response = await UserRegistrationAPI(formData);
      console.log(response.data);
    } catch (error) {
      console.log("Error: ", error);
    } finally {
      setTimeout(() => {
        setIsLoading(false);
        navigate("/login");
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
          <Form onSubmit={(e) => handleSubmit(e)}>
            <Input
              type="text"
              name="firstName"
              placeholder="first name"
              required
            />
            <Input
              type="text"
              name="lastName"
              placeholder="last name"
              required
            />
            <Input
              type="text"
              name="username"
              placeholder="username"
              required
            />
            <Input type="email" name="email" placeholder="email" required />
            <Input
              type="password"
              name="password"
              placeholder="password"
              required
              onChange={(e) => handlePassword(e)}
            />
            <Input
              type="password"
              name="confirmPassword"
              placeholder="confirm password"
              required
            />
            <PasswordBox>
              <PasswordStrengthBar password={password} />
            </PasswordBox>
            <Box>
              <Agreement>
                By creating an account, I consent to the processing of my
                personal data in accordance with the <b>PRIVACY POLICY</b>
              </Agreement>
              <Text>
                Already have an account? <Link href="/login">LOGIN</Link>
              </Text>
            </Box>
            <Button type="submit">CREATE</Button>
          </Form>
        </Wrapper>
      </Container>
    </>
  );
};

export default Register;
