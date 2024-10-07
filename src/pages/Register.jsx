import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { changeAuthenticated } from "../store/Slices/UserSlice";
import { useToast } from "@chakra-ui/react";
import { auth, GoogleAuthProvider, signInWithPopup } from "../context/Firebase"; // Update import
import { createUserWithEmailAndPassword } from "firebase/auth"; // Import user creation method
import { FaGoogle } from 'react-icons/fa'; // Import Google icon


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

const GoogleButton = styled(Button)`
    background-color: #4285f4; /* Google blue color */
    width: 100%; /* Full width */
`;

const Register = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const toast = useToast();
    const googleProvider = new GoogleAuthProvider();

    const handleRegister = async (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;

        try {
            await createUserWithEmailAndPassword(auth, email, password);
            toast({
                title: "Registration Successful",
                description: "You have successfully registered.",
                status: "success",
                duration: 5000,
                isClosable: true,
            });
            dispatch(changeAuthenticated(true));
            navigate("/");
        } catch (error) {
            toast({
                title: "Registration Failed!",
                description: error.message || "Please try again.",
                status: "error",
                duration: 5000,
                isClosable: true,
            });
            console.log(error);
        }
    };

    const handleGoogleLogin = async () => {
        try {
            const result = await signInWithPopup(auth, googleProvider);
            const user = result.user;
            toast({
                title: "Google Login Successful",
                description: `Welcome ${user.displayName}!`, // Corrected syntax
                status: "success",
                duration: 5000,
                isClosable: true,
            });
            dispatch(changeAuthenticated(true));
            navigate("/");
        } catch (error) {
            toast({
                title: "Google Login Failed!",
                description: "Please try again later.",
                status: "error",
                duration: 5000,
                isClosable: true,
            });
            console.log(error);
        }
    };

    return (
        <Container>
            <Wrapper>
                <Title>CREATE AN ACCOUNT</Title>
                <Form onSubmit={handleRegister}>
                    <Input placeholder="email" name="email" type="email" required />
                    <Input placeholder="password" name="password" type="password" required />
                    <Button type="submit">REGISTER</Button>
                </Form>
                <GoogleButton onClick={handleGoogleLogin}>
                    <FaGoogle style={{ marginRight: '8px' }} /> Sign up with Google
                </GoogleButton>
            </Wrapper>
        </Container>
    );
};

export default Register;
