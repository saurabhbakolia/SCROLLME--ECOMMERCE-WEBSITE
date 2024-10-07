import { Link } from "react-router-dom";
import styled from "styled-components";

// Styled component for the Logo (optional)
const LogoWrapper = styled.h1``;

const Logo = () => {
    return (
        <LogoWrapper>
            <Link to="/">
                SCROLL<span style={{ color: 'teal' }}>ME</span>
            </Link>
        </LogoWrapper>
    );
};

export default Logo;
