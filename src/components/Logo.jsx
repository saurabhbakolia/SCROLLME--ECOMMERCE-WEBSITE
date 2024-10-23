import { Link } from 'react-router-dom';
import styled from 'styled-components';

const LogoWrapper = styled.h1`
  font-size: ${({ size }) => size || '2rem'};
`;

const Logo = ({ size }) => {
  return (
    <LogoWrapper size={size}>
      <Link to='/'>
        SCROLL<span style={{ color: 'teal' }}>ME</span>
      </Link>
    </LogoWrapper>
  );
};

export default Logo;
