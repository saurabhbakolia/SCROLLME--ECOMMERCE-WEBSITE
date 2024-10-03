import styled from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Triangle } from "react-loader-spinner";
import { mobile, tablet } from "../responsive";
import { API_BASE_URL } from "../common/constants/apiConstants";

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

const Wrapper = styled.div`
    width: 40%;
    ${mobile({ width: "84%;" })}
    ${tablet({ width: "84%;" })}
    padding: 20px;
    background-color: white;
    border-radius: 10px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
    font-size: 24px;
    font-weight: 300;
    text-align: center;
    margin-bottom: 20px;
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
`;

const Input = styled.input`
    flex: 1;
    margin: 10px 0;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    &:focus {
        border-color: teal;
        outline: none;
    }
`;

const Button = styled.button`
    width: 100%;
    border: none;
    padding: 15px;
    background-color: teal;
    color: white;
    cursor: pointer;
    border-radius: 5px;
    font-weight: bold;
    margin-top: 10px;
    &:hover {
        background-color: darkcyan;
    }
`;

const Text = styled.p`
    font-size: 14px;
    text-align: center;
    margin: 10px 0;
`;

const Link = styled.a`
    font-size: 12px;
    text-decoration: underline;
    cursor: pointer;
`;

const Forgot = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        if (newPassword !== confirmPassword) {
            alert("Passwords do not match!");
            setIsLoading(false);
            return;
        }

        const url=API_BASE_URL+'/api/auth/updatepass';
        const response= await fetch(url,{
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email:email,
                password:newPassword,
            }),
        })
        const data= await response.json()
        console.log(data)
        if(data.message=='done'){
            navigate('/login')
        }
        else{
            alert(data.message)
        }
        setIsLoading(false)

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
                    <Title>FORGOT PASSWORD</Title>
                    <Form onSubmit={handleSubmit}>
                        <Input
                            type="email"
                            placeholder="Enter your email"
                            required
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <Input
                            type="password"
                            placeholder="New Password"
                            required
                            onChange={(e) => setNewPassword(e.target.value)}
                        />
                        <Input
                            type="password"
                            placeholder="Confirm New Password"
                            required
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                        <Button type="submit">RESET PASSWORD</Button>
                    </Form>
                    <Text>
                        Remembered your password? <Link href="/login">Login</Link>
                    </Text>
                </Wrapper>
            </Container>
        </>
    );
};

export default Forgot;
