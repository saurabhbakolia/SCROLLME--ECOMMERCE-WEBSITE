import { useState } from 'react';
import styled from 'styled-components';

// Styled Components
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  font-family: 'Poppins', sans-serif;
`;

const Logo = styled.h1`
  font-size: 3rem;
  color: #333;
  margin-bottom: 20px;
`;

const Heading = styled.h2`
  font-size: 2rem;
  color: #555;
  margin-bottom: 10px;
`;

const SubHeading = styled.p`
  font-size: 1.2rem;
  color: #777;
  margin-bottom: 30px;
`;

const EmailInput = styled.input`
  padding: 10px 20px;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 30px;
  margin-right: 10px;
  outline: none;
`;

const NotifyButton = styled.button`
  padding: 10px 20px;
  font-size: 1rem;
  color: #fff;
  background-color: #ff6f61;
  border: none;
  border-radius: 30px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #ff3b2f;
  }
`;

const SocialLinks = styled.div`
  margin-top: 30px;
  display: flex;
  gap: 20px;
`;

const SocialIcon = styled.a`
  font-size: 1.5rem;
  color: #555;
  transition: color 0.3s ease;

  &:hover {
    color: #ff6f61;
  }
`;

const ComingSoon = () => {
  const [email, setEmail] = useState('');

  const handleNotify = () => {
    alert(`Thank you! We will notify you at ${email}`);
    setEmail('');
  };

  return (
    <Container>
      <Logo>SCROLL ME</Logo>
      <Heading>Coming Soon</Heading>
      <SubHeading>We are working hard to give you a better experience. Stay tuned!</SubHeading>
      <div>
        <EmailInput
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <NotifyButton onClick={handleNotify}>Notify Me</NotifyButton>
      </div>
      <SocialLinks>
        <SocialIcon href="https://facebook.com" target="_blank" rel="noopener noreferrer">
          <i className="fab fa-facebook-f"></i>
        </SocialIcon>
        <SocialIcon href="https://twitter.com" target="_blank" rel="noopener noreferrer">
          <i className="fab fa-twitter"></i>
        </SocialIcon>
        <SocialIcon href="https://instagram.com" target="_blank" rel="noopener noreferrer">
          <i className="fab fa-instagram"></i>
        </SocialIcon>
      </SocialLinks>
    </Container>
  );
};

export default ComingSoon;