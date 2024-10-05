import {
  Email,
  Facebook,
  Instagram,
  LinkedIn,
  LocalPhone,
  LocationOn,
} from "@mui/icons-material";
import styled from "styled-components";
import { mobile } from "../responsive";
import { Link } from "react-router-dom";
import XIcon from "@mui/icons-material/X";

const Container = styled.div`
  display: flex;
  ${mobile({ flexDirection: "column" })}
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 20px;
`;

const Logo = styled.h1``;

const Desc = styled.p`
  margin: 20px 0px;
`;

const SocialContainer = styled.div`
  display: flex;
  ${mobile({ justifyContent: "center" })}
`;

const SocialIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  color: white;
  background-color: #${(props) => props.color};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 20px;
`;

const Center = styled.div`
  flex: 1;
  padding: 20px;
`;

const Title = styled.h3`
  margin-bottom: 30px;
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
`;

const Right = styled.div`
  flex: 1;
  padding: 20px;
  ${mobile({ backgroundColor: "#fff8f8" })}
`;

const ContactItem = styled.div`
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  ${mobile({ justifyContent: "center" })}
`;

const Payment = styled.img`
  width: 50%;
`;

const Footer = () => {
  return (
    <Container>
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
          <SocialIcon color="3B5999">
            <Facebook />
          </SocialIcon>
          <SocialIcon color="E4405F">
            <Instagram />
          </SocialIcon>
          <SocialIcon color="000000">
            <XIcon />
          </SocialIcon>
          <SocialIcon color="E60023">
            <LinkedIn />
          </SocialIcon>
        </SocialContainer>
      </Left>
      <Center>
        <Title>Useful Links</Title>
        <List>
          <ListItem>
            <Link to={"/"}>Home</Link>
          </ListItem>
          <ListItem>
            <Link to={"/cart"}>Cart</Link>
          </ListItem>
          <ListItem>Man Fashion</ListItem>
          <ListItem>Woman Fashion</ListItem>
          <ListItem>Accessories</ListItem>
          <ListItem>My Account</ListItem>
          <ListItem>Order Tracking</ListItem>
          <ListItem>Wishlist</ListItem>
          <ListItem>Wishlist</ListItem>
          <ListItem>Terms</ListItem>
        </List>
      </Center>
      <Right>
        <Title>Contact</Title>
        {/* Implimented LocationOn icon wrapped with link to open Google Maps pointing to the store's location */}
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
        {/* LocalPhone icon wrapped with link to open phone dialer with the phone number */}
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
        {/* Email icon wrapped with mailto link to open the default email client */}
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
    </Container>
  );
};

export default Footer;
