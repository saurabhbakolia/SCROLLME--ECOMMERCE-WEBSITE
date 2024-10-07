import {
  Email,
  Facebook,
  Instagram,
  LinkedIn,
  Twitter,
  LocalPhone,
  LocationOn,
} from '@mui/icons-material';
import styled from 'styled-components';
import { mobile } from '../responsive';
import { Link } from 'react-router-dom';
import XIcon from '@mui/icons-material/X';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #1a1a1a;
  color: #fff;
  padding: 40px 20px;
  ${mobile({ padding: "20px" })}
`;

const TopSection = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #1a1a1a;
  color: #fff;
  padding: 40px 20px;
  ${mobile({ padding: "20px" })}
`;



const Left = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 20px;
`;

const Logo = styled.h1`
  font-size: 28px;
`;

const Desc = styled.p`
  margin: 20px 0px;
  line-height: 1.6;
  font-size: 14px;
`;

const SocialContainer = styled.div`
  display: flex;
  margin-top: 10px;
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

const Center = styled.div`
  flex: 1;
  padding: 20px;
`;

const Title = styled.h3`
  margin-bottom: 30px;
  font-size: 18px;
  text-transform: uppercase;
`;

const List = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-wrap: wrap;
`;

const ListItem = styled.li`
  width: 50%;
  margin-bottom: 10px;
  font-size: 14px;
`;

const Right = styled.div`
  flex: 1;
  padding: 20px;
`;

const ContactItem = styled.div`
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  font-size: 14px;
`;

const Payment = styled.img`
  width: 70%;
  margin-top: 20px;
`;

const BottomSection = styled.div`
  display: flex;
  justify-content: space-between;
  border-top: 1px solid #444;
  padding-top: 10px;
  margin-top: 20px;
  font-size: 12px;
  ${mobile({ flexDirection: "column", textAlign: "center" })}
`;

const Footer = () => {
  return (
    <Container>
      <TopSection>
        <Left>
          <Logo>
            SCROLL<span style={{ color: "teal" }}>ME</span>.
          </Logo>
          <Desc>
            Welcome to{" "}
            <span style={{ color: "teal", fontWeight: 600 }}>ScrollMe</span> Web
            Store, your ultimate destination for trendy and fashionable clothing.
            We pride ourselves on curating a diverse collection of high-quality
            apparel that caters to your unique style and personality.
          </Desc>
          <SocialContainer>
            <SocialIcon href="https://facebook.com" color="3B5999">
              <Facebook />
            </SocialIcon>
            <SocialIcon href="https://instagram.com" color="E4405F">
              <Instagram />
            </SocialIcon>
            <SocialIcon href="https://twitter.com" color="1DA1F2">
              <Twitter />
            </SocialIcon>
            <SocialIcon href="https://linkedin.com" color="0A66C2">
              <LinkedIn />
            </SocialIcon>
          </SocialContainer>
        </Left>
        <Center>
          <Title>Useful Links</Title>
          <List>
            <ListItem>
              <Link to="/">Home</Link>
            </ListItem>
            <ListItem>
              <Link to="/cart">Cart</Link>
            </ListItem>
            <ListItem>Man Fashion</ListItem>
            <ListItem>Woman Fashion</ListItem>
            <ListItem>Accessories</ListItem>
            <ListItem>My Account</ListItem>
            <ListItem>Order Tracking</ListItem>
            <ListItem>Wishlist</ListItem>
            <ListItem>Terms & Conditions</ListItem>
            <ListItem>Privacy Policy</ListItem>
          </List>
        </Center>
        <Right>
          <Title>Contact</Title>
          <ContactItem>
            <a
              href="https://www.google.com/maps?q=622 Dixie Path, South Tobinchester 98336"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: "inherit",
                textDecoration: "none",
                display: "flex",
                alignItems: "center",
              }}
            >
              <LocationOn style={{ marginRight: "10px" }} />
              622 Dixie Path, South Tobinchester 98336
            </a>
          </ContactItem>
          <ContactItem>
            <a
              href="tel:+12345678"
              style={{
                color: "inherit",
                textDecoration: "none",
                display: "flex",
                alignItems: "center",
              }}
            >
              <LocalPhone style={{ marginRight: "10px" }} />
              +1 234 56 78
            </a>
          </ContactItem>
          <ContactItem>
            <Email style={{ marginRight: "10px" }} />
            <a
              href="mailto:contact@lama.dev"
              style={{ color: "inherit", textDecoration: "none" }}
            >
              contact@lama.dev
            </a>
          </ContactItem>
          <Payment src="https://i.ibb.co/Qfvn4z6/payment.png" />
        </Right>
      </TopSection>
      <BottomSection>
        <span>© 2024 ScrollMe. All Rights Reserved.</span>
        <span>
          Developed by <a href="https://lama.dev" style={{ color: "teal" }}>LamaDev</a>
        </span>
      </BottomSection>
    </Container>
  );
};

export default Footer;
