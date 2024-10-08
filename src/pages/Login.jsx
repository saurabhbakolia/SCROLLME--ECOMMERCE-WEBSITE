import styled from "styled-components";
import { UserSignInAPI } from "../services/userAPI/signInAPI";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { changeAuthenticated } from "../store/Slices/UserSlice";
import { mobile, tablet } from "../responsive";
import { useToast } from "@chakra-ui/react";
import { useState } from "react";

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
    width: 30%;
    ${mobile({ width: "85%" })}
    ${tablet({ width: "60%" })}
    padding: 20px;
    background-color: rgba(255, 255, 255, 0.9);
    border-radius: 10px;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
    font-size: 24px;
    font-weight: 500;
    text-align: center;
    margin-bottom: 20px;
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
`;

const Input = styled.input`
    flex: 1;
    min-width: 40%;
    margin: 10px 0;
    padding: 12px;
    border: 1px solid #ddd;
    border-radius: 5px;
    font-size: 16px;
`;

const Button = styled.button`
    width: 100%;
    border: none;
    padding: 15px 20px;
    background-color: #008080;
    color: white;
    cursor: pointer;
    margin-bottom: 10px;
    border-radius: 5px;
    font-size: 16px;
    transition: background-color 0.3s ease;
    
    &:hover {
        background-color: #005959;
    }

    &:disabled {
        background-color: #cccccc;
        cursor: not-allowed;
    }
`;

const Link = styled.a`
    margin: 5px 0px;
    font-size: 14px;
    text-align: center;
    text-decoration: underline;
    cursor: pointer;
    color: #008080;
`;

const PasswordToggle = styled.span`
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
    cursor: pointer;
    font-size: 14px;
    color: #555;
`;

const InputContainer = styled.div`
    position: relative;
`;

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const toast = useToast();
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const loginData = {
            username: e.target.username.value,
            password: e.target.password.value,
        };
        try {
            const response = await UserSignInAPI(loginData);
            toast({
                title: "Login Successful",
                description: response.message || "You have successfully logged in. Welcome back!",
                status: "success",
                duration: 5000,
                isClosable: true,
            });
            dispatch(changeAuthenticated(true));
            navigate("/");
        } catch (error) {
            toast({
                title: "Login Failed!",
                description: "Invalid credentials, please try again.",
                status: "error",
                duration: 5000,
                isClosable: true,
            });
            console.error(error);
        }
    };

    return (
        <Container>
            <Wrapper>
                <Title>SIGN IN</Title>
                <Form onSubmit={handleSubmit}>
                    <Input placeholder="Username" name="username" type="text" required />
                    <InputContainer>
                        <Input
                            placeholder="Password"
                            name="password"
                            type={showPassword ? "text" : "password"}
                            required
                        />
                        <PasswordToggle onClick={() => setShowPassword(!showPassword)}>
                            {showPassword ? "Hide" : "Show"}
                        </PasswordToggle>
                    </InputContainer>
                    <Button type="submit">LOGIN</Button>
                    <Link href="#">DO NOT YOU REMEMBER THE PASSWORD?</Link>
                    <Link href="/register">CREATE A NEW ACCOUNT</Link>
                </Form>
            </Wrapper>
        </Container>
    );
};

export default Login;
