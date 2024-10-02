import { Email, Facebook, Instagram, LinkedIn, LocalPhone, LocationOn, Twitter } from "@mui/icons-material";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { mobile } from '../responsive';

const Container = styled.div`
    display: flex;
    flex-wrap: wrap;
    background-color: #333;
    color: white;
    padding: 20px;
    ${mobile({ flexDirection: "column" })};
`;

const Left = styled.div`
    flex: 1;
    padding: 20px;
`;

const Logo = styled.h1`
    color: teal;
`;

const Desc = styled.p`
    margin: 20px 0px;
`;

const SocialContainer = styled.div`
    display: flex;
    margin-top: 10px;
`;

const SocialIcon = styled.a`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    color: white;
    background-color: #${(props) => props.color};
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 20px;
    cursor: pointer;
    text-decoration: none;
    &:hover {
        opacity: 0.8;
    }
`;

const Center = styled.div`
    flex: 1;
    padding: 20px;
`;

const Title = styled.h3`
    margin-bottom: 20px;
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

const LinkStyled = styled(Link)`
    text-decoration: none;
    color: white;
    &:hover {
        text-decoration: underline;
    }
`;

const Right = styled.div`
    flex: 1;
    padding: 20px;
`;

const ContactItem = styled.div`
    margin-bottom: 20px;
    display: flex;
    align-items: center;
`;

const Payment = styled.img`
    width: 50%;
`;

const Footer = () => {
    return (
        <Container>
            <Left>
                <Logo>SCROLL<span style={{ color: 'teal' }}>ME</span>.</Logo>
                <Desc>
                    Welcome to <span style={{ color: 'teal', fontWeight: 600 }}>ScrollMe</span> Web Store, your ultimate destination for trendy clothing.
                </Desc>
                <SocialContainer>
                    <SocialIcon href="https://facebook.com" color="3B5999" aria-label="Facebook">
                        <Facebook />
                    </SocialIcon>
                    <SocialIcon href="https://instagram.com" color="E4405F" aria-label="Instagram">
                        <Instagram />
                    </SocialIcon>
                    <SocialIcon href="https://twitter.com" color="55ACEE" aria-label="Twitter">
                        <Twitter />
                    </SocialIcon>
                    <SocialIcon href="https://linkedin.com" color="E60023" aria-label="LinkedIn">
                        <LinkedIn />
                    </SocialIcon>
                </SocialContainer>
            </Left>
            <Center>
                <Title>Useful Links</Title>
                <List>
                    <ListItem><LinkStyled to="/">Home</LinkStyled></ListItem>
                    <ListItem><LinkStyled to="/cart">Cart</LinkStyled></ListItem>
                    <ListItem><LinkStyled to="/privacy-policy">Privacy Policy</LinkStyled></ListItem>
                    <ListItem><LinkStyled to="/terms">Terms of Service</LinkStyled></ListItem>
                    <ListItem><LinkStyled to="/contact">Contact Us</LinkStyled></ListItem>
                </List>
            </Center>
            <Right>
                <Title>Contact</Title>
                <ContactItem>
                    <LocationOn style={{ marginRight: "10px" }} /> 622 Dixie Path, South Tobinchester 98336
                </ContactItem>
                <ContactItem>
                    <LocalPhone style={{ marginRight: "10px" }} /> +1 234 56 78
                </ContactItem>
                <ContactItem>
                    <Email style={{ marginRight: "10px" }} /> contact@scrollme.dev
                </ContactItem>
                <Payment src="https://i.ibb.co/Qfvn4z6/payment.png" alt="Payment Methods" />
            </Right>
        </Container>
    );
};

export default Footer;