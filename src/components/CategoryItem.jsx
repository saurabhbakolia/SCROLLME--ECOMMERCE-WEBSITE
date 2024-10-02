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
`;

const Image = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
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
        <Container>
            <LazyLoad height={200} offset={100} once>
                <Image src={item.img} />
            </LazyLoad>
            <Info>
                <Title>{item.title}</Title>
                <CustomBackgroundButton link="/item.title" text="SHOP NOW" backgroundColor="white" />
            </Info>
        </Container>
    );
};

export default CategoryItem;
