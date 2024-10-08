import React from "react";
import styled, { keyframes } from "styled-components";
import SearchIcon from "@mui/icons-material/Search";
import { ShoppingCartOutlined } from "@mui/icons-material";
import { mobile } from "../responsive";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const slideDown = keyframes`
  from { transform: translateY(-100%); }
  to { transform: translateY(0); }
`;

const Container = styled.div`
  height: 60px;
  width: 100%;
  position: fixed;
  top: 30px;
  left: 0;
  z-index: 999;
  background-color: white;
  animation: ${slideDown} 0.5s ease-out;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  ${mobile({ height: "120px;" })}
`;

const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  animation: ${fadeIn} 0.5s ease-out;
  ${mobile({
    height: "90px",
    padding: "10px 10px",
    flexDirection: "column",
    justifyContent: "space-evenly",
    alignItems: "center",
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
  transition: color 0.3s ease;
  &:hover {
    color: teal;
  }
  ${mobile({ display: "none;" })}
`;

const SearchContainer = styled.div`
  border: 1px solid lightgray;
  display: flex;
  align-items: center;
  margin-inline-start: 25px;
  padding: 5px;
  transition: all 0.3s ease;
  &:focus-within {
    border-color: teal;
    box-shadow: 0 0 5px rgba(0, 128, 128, 0.3);
  }
`;

const Input = styled.input`
  border: none;
  margin: "auto";
  transition: all 0.3s ease;
  &:focus {
    outline: none;
  }
  ${mobile({ width: "200px;", margin: "0 auto" })};
`;

const Center = styled.div`
  flex: 1;
  text-align: center;
`;

const Logo = styled.h1`
  font-weight: bold;
  transition: transform 0.3s ease;
  &:hover {
    transform: scale(1.05);
  }
  ${mobile({ fontSize: "24px;" })}
`;

const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  ${mobile({ flex: 2, justifyContent: "center" })}
`;

const MenuItem = styled.div`
  font-size: 14px;
  cursor: pointer;
  margin-inline-start: 25px;
  transition: color 0.3s ease, transform 0.3s ease;
  &:hover {
    color: teal;
    transform: translateY(-2px);
  }
  ${mobile({ fontSize: "12px", marginInlineStart: "10px" })}
`;

const Navbar = () => {
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);

  return (
    <Container>
      <Wrapper>
        <Left>
          <Language>EN</Language>
          <SearchContainer>
            <Input placeholder="Search..." />
            <SearchIcon style={{ color: "gray", fontSize: 16, cursor: "pointer" }} />
          </SearchContainer>
        </Left>
        <Center>
          <Logo>
            <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
              SCROLL<span style={{ color: "teal" }}>ME</span>
            </Link>
          </Logo>
        </Center>
        <Right>
          {!isAuthenticated && (
            <MenuItem>
              <Link to="/register" style={{ textDecoration: "none", color: "inherit" }}>REGISTER</Link>
            </MenuItem>
          )}
          {!isAuthenticated && (
            <MenuItem>
              <Link to="/login" style={{ textDecoration: "none", color: "inherit" }}>SIGN IN</Link>
            </MenuItem>
          )}
          <MenuItem>
            <Link to="/cart" style={{ textDecoration: "none", color: "inherit" }}>
              <ShoppingCartOutlined />
            </Link>
          </MenuItem>
        </Right>
      </Wrapper>
    </Container>
  );
};

export default Navbar;