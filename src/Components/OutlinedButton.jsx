import React from 'react'
import { Link } from 'react-router-dom';
import styled from 'styled-components'

const Button = styled(Link)`
    padding: 10px;
    font-size: 20px;
    background: transparent;
    cursor: pointer;
    text-transform: uppercase;
    text-decoration: none; /* Remove default underline */
    border: 2px solid black;
`;


const OutlinedButton = (props) => {
    return (
        <Button to={props.link}>{props.text}</Button>
    )
}

export default OutlinedButton