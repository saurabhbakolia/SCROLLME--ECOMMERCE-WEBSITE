import styled from "styled-components";
import { useState } from "react";
import { UserSignInAPI } from "../services/userAPI/signInAPI";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { changeAuthenticated } from "../store/Slices/UserSlice";
import { mobile, tablet } from "../responsive";
import { BsEye, BsEyeSlash } from "react-icons/bs";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://images.pexels.com/photos/6984650/pexels-photo-6984650.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940")
      center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 25%;
  ${mobile({ width: "84%;" })}
  ${tablet({ width: "84%;" })}
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

const InputContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const PasswordToggleIcon = styled.div`
  position: absolute;
  right: 10px;
  cursor: pointer;
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

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false); // State to manage password visibility

  const handleSubmit = async (e) => {
    e.preventDefault();
    const loginData = {
      username: e.target.username.value,
      password: e.target.password.value,
    };
    try {
      const response = await UserSignInAPI(loginData);
      dispatch(changeAuthenticated(true));
      navigate("/");
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container>
      <Wrapper>
        <Title>SIGN IN</Title>
        <Form onSubmit={(e) => handleSubmit(e)}>
          <Input placeholder="username" name="username" type="text" required />

          {/* Password field with toggle icon */}
          <InputContainer>
            <Input
              placeholder="password"
              name="password"
              type={showPassword ? "text" : "password"} // Toggle input type
              required
            />
            <PasswordToggleIcon onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? (
                <BsEye size={20} className="mt-2" />
              ) : (
                <BsEyeSlash size={20} className="mt-2" />
              )}
            </PasswordToggleIcon>
          </InputContainer>

          <Button type="submit">LOGIN</Button>
          <Link>DO NOT YOU REMEMBER THE PASSWORD?</Link>
          <Link href="/register">CREATE A NEW ACCOUNT</Link>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Login;
