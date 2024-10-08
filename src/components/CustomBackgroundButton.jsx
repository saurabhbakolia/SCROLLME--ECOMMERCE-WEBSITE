import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const ContainedButton = styled(Link)`
  border: none;
  padding: 10px;
  background-color: ${(props) => props.backgroundcolor || 'white'};
  color: gray;
  cursor: pointer;
  font-weight: 600;
  text-decoration: none;
  text-transform: uppercase;
`;

const CustomBackgroundButton = (props) => {
  return (
    <ContainedButton to={props.link} backgroundcolor={props.backgroundcolor}>
      {props.text}
    </ContainedButton>
  );
};

export default CustomBackgroundButton;
