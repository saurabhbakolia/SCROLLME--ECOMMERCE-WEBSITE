import {
    FavoriteBorderOutlined,
    SearchOutlined,
    ShoppingCartOutlined,
} from '@mui/icons-material';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import LazyLoad from 'react-lazyload';
import { useState } from 'react';

const Info = styled.div`
    opacity: 0;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.2);
    z-index: 3;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.5s ease;
    cursor: pointer;
`;

const Container = styled.div`
    flex: 1; /* This allows the container to grow, but you can adjust it if needed */
    margin: 5px;
    min-width: 240px;  /* Minimum width */
    max-width: 300px;  /* Maximum width to avoid stretching */
    height: 400px;     /* Fixed height */
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #f0f0f0; /* Light gray background color */
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Optional: adds a subtle shadow for depth */
    position: relative;
    overflow: hidden;
    &:hover ${Info} {
      opacity: 1; /* Show info on hover */
    }
`;

const ImageContainer = styled.div`
    height: 65%;     /* Fixed height */
    width: 100%;     /* Full width of the container */
    position: relative;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: auto;
    border-radius: 10px;
`;

const Image = styled.img`
    height: auto; /* Maintain aspect ratio */
    width: 100%;  /* Full width of the container */
    object-fit: cover; /* Cover will maintain aspect ratio while covering the container */
    z-index: 2;
    border-radius: 10px;
`;

const Icon = styled.div`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 10px;
    transition: all 0.5s ease;

    &:hover {
        background-color: #e9f5f5;
        transform: scale(1.2);
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    }

    &:active {
        transform: scale(1.1); /* Shrinks slightly when clicked */
        transition: transform 0.1s;
    }
`;

const Product = ({ item }) => {
    const [cartImages, setCartImages] = useState([]);
    const navigate = useNavigate();

    const handleProductSearch = (id) => {
        navigate(`/product/${id}`);
    };

    const handleAddToCart = (image) => {
        setCartImages((prev) => [...prev, image]); // Add the image to the cart state
    };

    return (
        <>
            <Container>
                <ImageContainer>
                    <LazyLoad height={200.5} offset={10} once>
                        <Image src={item.img} alt={item.title} />
                    </LazyLoad>
                </ImageContainer>
                <Info>
                    <Icon onClick={() => handleAddToCart(item.img)}>
                        <ShoppingCartOutlined />
                    </Icon>
                    <Icon onClick={() => handleProductSearch(item.id)}>
                        <SearchOutlined />
                    </Icon>
                    <Icon>
                        <FavoriteBorderOutlined />
                    </Icon>
                </Info>
            </Container>

            {/* Cart Section to Display Images */}
            {cartImages.length > 0 && (
                <div>
                    {cartImages.map((img, index) => (
                        <img src={img} key={index} alt="Cart Item" />
                    ))}
                </div>
            )}
        </>
    );
};

export default Product;
