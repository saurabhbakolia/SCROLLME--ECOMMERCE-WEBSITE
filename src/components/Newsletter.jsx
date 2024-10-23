import { Send } from '@mui/icons-material';
import styled from 'styled-components';
import { mobile } from '../responsive';
import { useState } from 'react';

const Container = styled.div`
  height: 60vh;
  background-color: #fcf5f5;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;
const Title = styled.h1`
  font-size: 70px;
  margin-bottom: 20px;
`;
const Description = styled.div`
  font-size: 24px;
  font-weight: 300;
  margin-bottom: 20px;
  ${mobile({ textAlign: 'center' })}
`;
const InputContainer = styled.div`
  width: 50%;
  height: 40px;
  background-color: white;
  display: flex;
  justify-content: space-between;
  border: 1px solid lightgray;
  ${mobile({ width: '80%' })}
`;
const Input = styled.input`
  border: none;
  flex: 8;
  padding-left: 20px;
`;
const Button = styled.button`
  flex: 1;
  border: none;
  background-color: teal;
  color: white;
  cursor: pointer;
`;

const Newsletter = () => {
  const [email, setEmail] = useState('');

  const handleNotify = () => {
    alert(`Thank you! We will notify you at ${email}`);
    setEmail('');
  };

  return (
    <Container>
      <Title>Newsletter</Title>
      <Description>Get timely updates from your favorite products.</Description>
      <InputContainer>
        <Input placeholder='Your email address' value={email} onChange={(e) => setEmail(e.target.value)} />
        <Button onClick={handleNotify}>
          <Send />
        </Button>
      </InputContainer>
    </Container>
  );
};

export default Newsletter;
