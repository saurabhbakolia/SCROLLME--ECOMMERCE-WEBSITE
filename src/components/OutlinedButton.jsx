import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { mobile } from '../responsive';
const Button = styled(Link)`
  padding: 10px 20px; /* Add horizontal padding */
  font-size: 20px; /* Default font size */
  background: transparent;
  cursor: pointer;
  text-transform: uppercase;
  text-decoration: none; /* Remove default underline */
  border: 2px solid black;
  font-weight: 500;

  /* Media query for small devices */
  ${mobile({
    padding: '8px 16px',
    fontSize: '16px',
  })}
`;

const OutlinedButton = (props) => {
  return <Button to={props.link}>{props.text}</Button>;
};

export default OutlinedButton;
