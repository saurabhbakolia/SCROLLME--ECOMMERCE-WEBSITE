import React from 'react';
import ProductCard from './ProductCard';
import { allProducts } from '../data';
import styled from 'styled-components';


const ProductGalleryContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 16px;
    padding: 16px;
    margin-top: 90px;
    justify-items: center;
    align-items: center;
    background-color: #f5fafd;
    min-height: 100vh;
    width: 100%;
    overflow-x: hidden;
    @media only screen and (max-width: 768px) {
        grid-template-columns: repeat(2, 1fr);
    }
    @media only screen and (max-width: 480px) {
        grid-template-columns: repeat(1, 1fr);
    }
`;


const ProductGallery = () => {
    return (
        <React.Fragment>
            <ProductGalleryContainer>
                {allProducts.map((product) => (
                    <ProductCard product={product} key={product.id} />
                ))}
            </ProductGalleryContainer>
        </React.Fragment>
    )
}

export default ProductGallery