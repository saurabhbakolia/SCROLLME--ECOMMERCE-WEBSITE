import styled from "styled-components";
import { mobile } from '../responsive'
import { Link } from 'react-router-dom';
import LazyLoad from 'react-lazyload';
import CustomBackgroundButton from "./CustomBackgroundButton";

const Container = styled.div`
    flex: 1;
    margin: 3px;
    height: 70vh;
    position: relative;
  
    background-color: #f3f4f6; 
    border-radius: 8px; 
    transition: transform 0.4s ease-in-out, background-color 0.4s ease-in-out, box-shadow 0.4s ease-in-out;

  &:hover {
    background-color: #10b981; /* Attractive green color */
    transform: translateY(-10px) scale(1.05); /* Lift the container and scale it */
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.2); /* Soft shadow */
  }

    ${mobile({ 
        marginTop:"50px"
    })}
`;

const Image = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
    cursor: pointer;
   
    ${mobile({ height: "50vh;" })}
`;

const Info = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const Title = styled.h1`
    color: white;
    margin-bottom: 20px;
`;


const CategoryItem = ({ item }) => {
    return (
        <Container >
            <LazyLoad height={200} offset={100} once>
              
                <Image src={item.img}  />
            </LazyLoad>
            <Info>
                <Title>{item.title}</Title>
                <CustomBackgroundButton link="/item.title" text="SHOP NOW " backgroundColor="white" />
            </Info>
        </Container>
    );
};

export default CategoryItem;
