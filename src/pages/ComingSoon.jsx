import { useState } from 'react';
import styled from 'styled-components';
import { Facebook, Instagram, LinkedIn } from '@mui/icons-material';
import XIcon from '@mui/icons-material/X';
import { mobile } from '../responsive';
import Logo from '../components/Logo';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  font-family: 'Poppins', sans-serif;
`;

const SocialContainer = styled.div`
  margin-top: 26px;
  display: flex;
  ${mobile({ justifyContent: 'center' })}
`;

const SocialIcon = styled.a`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #${(props) => props.color};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  margin-right: 15px;
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    transform: scale(1.1);
  }
`;

const Heading = styled.h2`
  font-size: 1.4rem;
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
  background-color: teal;
  border: none;
  border-radius: 30px;
  cursor: pointer;
  transition: opacity 0.3s ease-in-out;
  opacity: 80%;

  &:hover {
    opacity: 100%;
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
      <Logo />
      <Heading>Coming Soon</Heading>
      <SubHeading>We are working hard to give you a better experience. Stay tuned!</SubHeading>
      <div>
        <EmailInput type='email' placeholder='Enter your email' value={email} onChange={(e) => setEmail(e.target.value)} />
        <NotifyButton onClick={handleNotify}>Notify Me</NotifyButton>
      </div>
      <SocialContainer>
        <SocialIcon href='https://facebook.com' target='_blank' rel='noopener_noreferrrer' color='3B5999'>
          <Facebook />
        </SocialIcon>
        <SocialIcon href='https://instagram.com' target='_blank' rel='noopener_noreferrer' color='E4405F'>
          <Instagram />
        </SocialIcon>
        <SocialIcon href='https://twitter.com' target='_blank' rel='noopener_noreferrer' color='55ACEE'>
          <XIcon />
        </SocialIcon>
        <SocialIcon href='https://www.linkedin.com' target='_blank' rel='noopener_noreferrer' color='E60023'>
          <LinkedIn />
        </SocialIcon>
      </SocialContainer>
    </Container>
  );
};

export default ComingSoon;
