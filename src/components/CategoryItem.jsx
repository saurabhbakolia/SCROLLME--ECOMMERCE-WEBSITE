import styled, { keyframes } from 'styled-components';
import { mobile } from '../responsive';
import LazyLoad from 'react-lazyload';
import CustomBackgroundButton from './CustomBackgroundButton';

const Container = styled.div`
  flex: 1;
  margin: 3px;
  height: 70vh;
  position: relative;
  overflow: hidden;
`;

const zoomIn = keyframes`
    from {
        transform: scale(1);
    }
    to {
        transform: scale(1.1);
    }
`;

const glow = keyframes`
    0% {
        box-shadow: 0 0 5px rgba(255, 255, 255, 0.6);
    }
    50% {
        box-shadow: 0 0 20px rgba(255, 255, 255, 0.8);
    }
    100% {
        box-shadow: 0 0 5px rgba(255, 255, 255, 0.6);
    }
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: all 0.5s ease;
  ${mobile({ height: '50vh' })}
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
  transition:
    transform 0.3s ease,
    text-shadow 0.5s ease;
  text-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
  &:hover {
    animation:
      ${glow} 1.5s infinite alternate,
      ${zoomIn} 0.3s forwards;
    text-shadow: 0 0 20px rgba(255, 255, 255, 1);
  }
`;

const CustomButtonWrapper = styled.div`
  transition:
    transform 0.3s ease,
    box-shadow 0.5s ease;
  &:hover {
    animation:
      ${glow} 1.5s infinite alternate,
      ${zoomIn} 0.3s forwards;
  }
`;

const ContainerHover = styled(Container)`
  &:hover ${Image} {
    transform: scale(1.1);
  }

  &:hover ${Title}, &:hover ${CustomButtonWrapper} {
    animation:
      ${glow} 1.5s infinite alternate,
      ${zoomIn} 0.3s forwards;
  }
`;

const CategoryItem = ({ item }) => {
  return (
    <ContainerHover>
      <LazyLoad height={200} offset={100} once>
        <Image src={item.img} />
      </LazyLoad>
      <Info>
        <Title>{item.title}</Title>
        <CustomButtonWrapper>
          <CustomBackgroundButton link='/item.title' text='SHOP NOW' backgroundcolor='white' />
        </CustomButtonWrapper>
      </Info>
    </ContainerHover>
  );
};

export default CategoryItem;
