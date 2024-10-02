import { css } from 'styled-components';

export const mobile = (props) => {
    return css`
        @media only screen and (max-width: 768px) {
            ${props}
        }
        @media only screen and (max-width: 380px) {
            ${props}
        }
    `;
};


export const tablet = (props) => {
    return css`
        @media only screen and (max-width: 1200px) {
            ${props}
        };
    `;
};

export const desktop = (props) => {
    return css`
        @media only screen and (max-width: 1920px) {
            ${props}
        };
    `;
};


