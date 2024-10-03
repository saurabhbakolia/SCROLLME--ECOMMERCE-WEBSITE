import {
	Email,
	Facebook,
	Instagram,
	LinkedIn,
	LocalPhone,
	LocationOn,
	Twitter,
} from "@mui/icons-material";
import styled from "styled-components";
import { mobile } from "../responsive";
import { Link } from "react-router-dom";

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
  transition: transform 0.3s ease, background-color 0.3s ease;
  cursor: pointer;

  &:hover {
    transform: scale(1.1);
    background-color: #${(props) => props.hoverColor || props.color};
  }
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
  transition: transform 0.3s ease;

  &:hover {
    transform: translateX(5px);
  }
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

const StyledLink = styled(Link)`
  color: inherit;
  text-decoration: none;
  transition: color 0.3s ease;

  &:hover {
    color: teal;
  }
`;

const ContactLink = styled.a`
  color: inherit;
  text-decoration: none;
  display: flex;
  align-items: center;
  transition: color 0.3s ease;

  &:hover {
    color: teal;
  }
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
					<SocialIcon color="3B5999" hoverColor="4267B2">
						<Facebook />
					</SocialIcon>
					<SocialIcon color="E4405F" hoverColor="C13584">
						<Instagram />
					</SocialIcon>
					<SocialIcon color="55ACEE" hoverColor="1DA1F2">
						<Twitter />
					</SocialIcon>
					<SocialIcon color="E60023" hoverColor="0077B5">
						<LinkedIn />
					</SocialIcon>
				</SocialContainer>
			</Left>
			<Center>
				<Title>Useful Links</Title>
				<List>
					<ListItem>
						<StyledLink to={"/"}>Home</StyledLink>
					</ListItem>
					<ListItem>
						<StyledLink to={"/cart"}>Cart</StyledLink>
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
				<ContactItem>
					<ContactLink
						href="https://www.google.com/maps?q=622 Dixie Path, South Tobinchester 98336"
						target="_blank"
						rel="noopener noreferrer"
					>
						<LocationOn style={{ marginRight: "10px" }} />
						622 Dixie Path, South Tobinchester 98336
					</ContactLink>
				</ContactItem>
				<ContactItem>
					<ContactLink href="tel:+12345678">
						<LocalPhone style={{ marginRight: "10px" }} />
						+1 234 56 78
					</ContactLink>
				</ContactItem>
				<ContactItem>
					<Email style={{ marginRight: "10px" }} />
					<ContactLink href="mailto:contact@lama.dev">
						contact@lama.dev
					</ContactLink>
				</ContactItem>

				<Payment src="https://i.ibb.co/Qfvn4z6/payment.png" />
			</Right>
		</Container>
	);
};

export default Footer;
