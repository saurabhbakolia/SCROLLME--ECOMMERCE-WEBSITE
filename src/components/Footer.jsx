import { Email, Facebook, Instagram, LinkedIn, LocalPhone, LocationOn } from '@mui/icons-material';
import XIcon from '@mui/icons-material/X';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Logo from '../components/Logo';
import { mobile } from '../responsive';

const Container = styled.div`
  display: flex;
  ${mobile({ flexDirection: 'column' })}
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 20px;
`;

const Desc = styled.p`
  margin: 20px 0px;
  line-height: 1.6;
  font-size: 14px;
`;

const SocialContainer = styled.div`
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
  ${mobile({ backgroundColor: '#fff8f8' })}
`;

const ContactItem = styled.div`
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  ${mobile({ justifyContent: 'center' })}
`;

const Payment = styled.img`
  width: 70%;
  margin-top: 20px;
`;

const Footer = () => {
  return (
    <Container>
      <Left>
        <Logo size={'3rem'} /> {/* Using Logo component directly */}
        <Desc>
          Welcome to <span style={{ color: 'teal', fontWeight: 600 }}>ScrollMe</span> Web Store, your ultimate destination for trendy and
          fashionable clothing. We pride ourselves on curating a diverse collection of high-quality apparel that caters to your unique style
          and personality.
        </Desc>
        <SocialContainer>
          <SocialIcon color='3B5999'>
            <Facebook />
          </SocialIcon>
          <SocialIcon color='E4405F'>
            <Instagram />
          </SocialIcon>
          <SocialIcon color='000000'>
            <XIcon />
          </SocialIcon>
          <SocialIcon color='E60023'>
            <LinkedIn />
          </SocialIcon>
        </SocialContainer>
      </Left>
      <Center>
        <Title>Useful Links</Title>
        <List>
          <ListItem>
            <Link to={'/'}>Home</Link>
          </ListItem>
          <ListItem>
            <Link to={'/cart'}>Cart</Link>
          </ListItem>
          <ListItem>
            <Link to={'/comingsoon'}>Men Fashion</Link>
          </ListItem>
          <ListItem>
            <Link to={'/comingsoon'}>Woman Fashion</Link>
          </ListItem>
          <ListItem>
            <Link to={'/comingsoon'}>Accessories</Link>
          </ListItem>
          <ListItem>
            <Link to={'/comingsoon'}>My Account</Link>
          </ListItem>
          <ListItem>
            <Link to={'/comingsoon'}>Order Tracking</Link>
          </ListItem>
          <ListItem>
            <Link to={'/wishlist'}>Wishlist</Link>
          </ListItem>
          <ListItem>
            <Link to={'/contributors'}>Contributors</Link>
          </ListItem>
          <ListItem>
            <Link to={'/comingsoon'}>Terms</Link>
          </ListItem>
        </List>
      </Center>
      <Right>
        <Title>Contact</Title>
        <ContactItem>
          <a
            href='https://www.google.com/maps?q=622 Dixie Path, South Tobinchester 98336'
            target='_blank'
            rel='noopener noreferrer'
            style={{
              color: 'inherit',
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <LocationOn style={{ marginRight: '10px' }} />
            622 Dixie Path, South Tobinchester 98336
          </a>
        </ContactItem>
        <ContactItem>
          <a
            href='tel:+12345678'
            style={{
              color: 'inherit',
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <LocalPhone style={{ marginRight: '10px' }} />
            +1 234 56 78
          </a>
        </ContactItem>
        <ContactItem>
          <Email style={{ marginRight: '10px' }} />
          <a href='mailto:contact@lama.dev' style={{ color: 'inherit', textDecoration: 'none' }}>
            contact@lama.dev
          </a>
        </ContactItem>

        <Payment src='https://i.ibb.co/Qfvn4z6/payment.png' />
      </Right>
    </Container>
  );
};

export default Footer;
