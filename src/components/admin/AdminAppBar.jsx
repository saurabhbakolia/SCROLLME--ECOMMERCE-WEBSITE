import { useToast } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { UserSingOutAPI } from '../../services/userAPI/userService';
import { logOut } from '../../store/slices/userSlice';
import { mobile } from '../../responsive';
import Logo from '../Logo';

const Container = styled.div`
  height: fit-content;
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


const AdminAppBar = () => {
    const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
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

                </Left>
                <Center>
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', fontWeight: 'bold' }}>
                        <Logo />
                    </div>
                </Center>
                <Right>
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
                    {isAuthenticated && (<MenuItem onClick={handleLogout}>LOG OUT</MenuItem>)}
                </Right>
            </Wrapper>
        </Container>
    );
};

export default AdminAppBar;