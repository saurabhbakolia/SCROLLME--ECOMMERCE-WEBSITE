import styled from 'styled-components';
import SearchIcon from '@mui/icons-material/Search';
import { ShoppingCartOutlined, FavoriteBorderOutlined } from '@mui/icons-material';
import { mobile } from '../responsive';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Box, useToast } from '@chakra-ui/react';
import { logOut } from '../store/slices/userSlice';
import { Badge } from '@chakra-ui/react';
import Logo from '../components/Logo';
import { UserSingOutAPI } from '../services/userAPI/userService';

const Container = styled.div`
  height: 60px;
  width: 100%;
  background-color: white;
  ${mobile({ height: '120px;' })}
`;

const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  ${mobile({
    height: '90px',
    padding: '10px 10px',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  })}
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;

const Language = styled.span`
  font-size: 14px;
  cursor: pointer;
  ${mobile({ display: 'none;' })}
`;

const SearchContainer = styled.div`
  border: 1px solid lightgray;
  display: flex;
  align-items: center;
  margin-inline-start: 25px;
  padding: 5px;
`;

const Input = styled.input`
  border: none;
  margin: 'auto' ${mobile({ width: '200px;', margin: '0 auto' })};
`;
const Center = styled.div`
  flex: 1;
  text-align: center;
`;

const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  ${mobile({ flex: 2, justifyContent: 'center' })}
`;

const MenuItem = styled.div`
  font-size: 14px;
  cursor: pointer;
  margin-inline-start: 25px;
  ${mobile({ fontSize: '12px', marginInlineStart: '10px' })}
`;

const Navbar = () => {
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const cartItems = useSelector((state) => state.cart.items);
  const totalQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const toast = useToast();

  const handleLogout = async () => {
    try {
      const res = await UserSingOutAPI();

      if (res?.status === 200) {
        toast({
          title: 'Logout Successfully!',
          description: res?.data?.message || 'You have successfully logged out!',
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
        dispatch(logOut());
        navigate('/');
      }
    } catch (error) {
      console.error('Logout failed:', error);
      toast({
        title: 'Logout Failed!',
        description: error || 'Something went wrong logging out!',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Container>
      <Wrapper>
        <Left>
          <Language>EN</Language>
          <SearchContainer>
            <Input placeholder='Search' />
            <SearchIcon style={{ color: 'gray', fontSize: 16 }} />
          </SearchContainer>
        </Left>
        <Center>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', fontWeight: 'bold' }}>
            {' '}
            <Logo />{' '}
          </div>
        </Center>
        <Right>
          <MenuItem>
            <Link to='/contact-us'>CONTACT US</Link>
          </MenuItem>
          {!isAuthenticated && (
            <MenuItem>
              <Link to='/register'>REGISTER</Link>
            </MenuItem>
          )}
          {!isAuthenticated && (
            <MenuItem>
              <Link to='/login'>SIGN IN</Link>
            </MenuItem>
          )}
          {isAuthenticated && <MenuItem onClick={handleLogout}>LOG OUT</MenuItem>}
          <MenuItem>
            <Link to='/cart'>
              <Box position='relative'>
                <ShoppingCartOutlined />
                {totalQuantity > 0 && (
                  <Badge colorScheme='teal' borderRadius='full' position='absolute' top='-5px' right='-10px' fontSize='0.8em'>
                    {totalQuantity}
                  </Badge>
                )}
              </Box>
            </Link>
          </MenuItem>
          <MenuItem>
            <Link to='/wishlist'>
              <FavoriteBorderOutlined />
            </Link>
          </MenuItem>
        </Right>
      </Wrapper>
    </Container>
  );
};

export default Navbar;
