import React from "react";
import styled from "styled-components";
import SearchIcon from "@mui/icons-material/Search";
import { ShoppingCartOutlined } from "@mui/icons-material";
import { mobile } from "../responsive";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Container = styled.div`
  height: 60px;
  width: 100%;
  position: fixed;
  top: 30px;
  left: 0;
  z-index: 999;
  background-color: white;
  ${mobile({ height: "120px;" })}
`;

const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  ${mobile({
    height: "90px",
    padding: "10px 10px", // Reduced padding for smaller screens
    flexDirection: "column", // Stack items vertically
    justifyContent: "space-evenly",
    alignItems: "center", // Align items to the start
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
  ${mobile({ display: "none;" })}
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
  margin: "auto" ${mobile({ width: "200px;", margin: "0 auto" })};
`;
const Center = styled.div`
  flex: 1;
  text-align: center;
`;

const Logo = styled.h1`
  font-weight: bold;
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
            <Input />
            <SearchIcon style={{ color: "gray", fontSize: 16 }} />
          </SearchContainer>
        </Left>
        <Center>
          <Logo>
            <Link to="/">
              SCROLL<span style={{ color: "teal" }}>ME</span>
            </Link>
          </Logo>
        </Center>
        <Right>
          {!isAuthenticated && (
            <MenuItem>
              <Link to="/register">REGISTER</Link>
            </MenuItem>
          )}
          {!isAuthenticated && (
            <MenuItem>
              <Link to="/login">SIGN IN</Link>
            </MenuItem>
          )}
          <MenuItem>
            <Link to="/cart">
              <ShoppingCartOutlined />
            </Link>
          </MenuItem>
        </Right>
      </Wrapper>
    </Container>
  );
};

export default Navbar;
