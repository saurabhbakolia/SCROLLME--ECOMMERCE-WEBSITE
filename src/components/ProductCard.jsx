import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import LazyLoad from 'react-lazyload';


const ProductCard = (props) => {
    const navigate = useNavigate();
    const handleProductClick = (id) => {
        navigate(`/products/${id}`);
    };

    return (
        <Container onClick={() => handleProductClick(props.product.id)}>
            <LazyLoad height={389} offset={200} once placeholder={<Placeholder />}>
                <ProductImage src={props.product.img} />
            </LazyLoad>
            <Info>
                <h4>{props.product.title}</h4>
                <p>{props.product.desc}</p>
                <ProductRating>
                    <h5>{props.product.rating}</h5>
                    <p>({props.product.numRatings})</p>
                    <ProductAssuredSpan>ScrollMe Assured</ProductAssuredSpan>
                </ProductRating>
                <ProductPrice>
                    <h5>{props.product.price}</h5>
                    <p>{props.product.discount}</p>
                </ProductPrice>
                <ProductUpdate>
                    <p>{props.product.update}</p>
                </ProductUpdate>
            </Info>
        </Container>
    )
}

export default ProductCard;



const Container = styled.div`
    background-color: #fff;
    min-width: 280px;
    max-width: 360px;
    height: 540px;
    padding: 2px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
`;

const ProductImage = styled.img`
    // background-color: pink;
    aspect-ratio: 1/1;
    width: 96%;
    height:72%;
    object-fit: contain;
    object-position: center;
    margin: auto;
    display: block;
    cursor: pointer;
`;

const Info = styled.div`
    width: 100%;
    height: 28%;
    padding-block:4px;
    // background-color: red;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-between;
    gap: 4px;
    text-align: left;

    h4 { 
        cursor: pointer;
    }
`;

const ProductPrice = styled.div`
    // background-color: green;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap:8px;
`;

const ProductRating = styled.div`
    // background-color: yellow;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap:10px;
    
    p {
        font-size: 14px;
        color: #777;
        font-weight: bold;
    }
`;

const ProductUpdate = styled.div`
    // background-color: purple;
    padding: 2px;
`;

const ProductAssuredSpan = styled.span`
    background-color: teal;
    color: #fff;
    padding: 2px 4px;
    border-radius: 4px;
    font-size: 12px;
    font-weight: 600;
    text-transform: uppercase;
`;

const Placeholder = styled.div`
    aspect-ratio: 1/1;
    width: 96%;
    height: 72%;
    background-color: #e0e0e0; // Light gray color for the placeholder
    display: flex;
    align-items: center;
    justify-content: center;
    margin: auto;
`;