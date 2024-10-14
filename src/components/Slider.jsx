import styled from 'styled-components';
import { ArrowLeftOutlined, ArrowRightOutlined } from '@mui/icons-material';
import { slideItems } from '../data';
import { useState, useEffect } from 'react';
import { mobile, tablet } from '../responsive';
import OutlinedButton from './OutlinedButton';
import LazyLoad from 'react-lazyload';

const Container = styled.div`
  width: 100%;
  height: 70vh;
  display: flex;
  position: relative;
  overflow: hidden;
  ${mobile({ height: '55vh' })}
`;

const Arrow = styled.div`
  width: 50px;
  height: 50px;
  background-color: #fff7f7;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  bottom: 0;
  left: ${(props) => props.direction === 'left' && '10px'};
  right: ${(props) => props.direction === 'right' && '10px'};
  margin: auto;
  cursor: pointer;
  opacity: 0.5;
  z-index: 2;
`;

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  transition: all 1.5s ease;
  transform: translateX(${(props) => props.slideIndex * -100}vw);
`;

const Slide = styled.div`
  width: 100vw;
  height: 100%;
  display: flex;
  align-items: center;
  background-color: ${(props) => props.bg};
  position: relative;
  ${tablet({ flexDirection: 'column' })}
`;

const ImgContainer = styled.div`
  height: 100%;
  flex: 1;
  position: relative;
`;

const Image = styled.img`
  height: 90%;
  width: 100%;
  object-fit: cover;
`;

const InfoContainer = styled.div`
  flex: 1;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: left;
  ${tablet({
    padding: '10px',
    textAlign: 'center',
    justifyContent: 'flex-start'
  })}
  ${mobile({ padding: '5px', justifyContent: 'flex-start' })}
`;

const Title = styled.h1`
  font-size: 50px;
  ${tablet({ fontSize: '40px' })}
  ${mobile({ fontSize: '25px' })}
`;

const Desc = styled.p`
  margin: 20px 0px;
  font-size: 16px;
  font-weight: 500;
  letter-spacing: 2px;
  ${tablet({ fontSize: '14px', margin: '10px 0' })}
  ${mobile({ fontSize: '12px', margin: '5px 0' })}
`;

const Placeholder = styled.div`
  height: 40%;
  width: 40%;
  background-color: #f0f0f0;
`;

const ButtonContainer = styled.div`
  position: relative; /* Default position */
  margin-top: 0;

  /* Position absolutely for small devices */
  ${mobile({
    position: 'absolute',
    top: '20px',
    right: '20px'
  })}
`;

const Slider = () => {
  const [slideIndex, setSlideIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setSlideIndex((prev) => (prev < slideItems.length - 1 ? prev + 1 : 0));
    }, 3000);

    return () => clearInterval(timer);
  }, []);

  const handleClick = (direction) => {
    if (direction === 'left') {
      setSlideIndex(slideIndex > 0 ? slideIndex - 1 : slideItems.length - 1);
    } else {
      setSlideIndex(slideIndex < slideItems.length - 1 ? slideIndex + 1 : 0);
    }
  };

  return (
    <Container>
      <Arrow direction='left' onClick={() => handleClick('left')}>
        <ArrowLeftOutlined />
      </Arrow>
      <Wrapper slideIndex={slideIndex}>
        {slideItems.map((item) => (
          <Slide bg={item.bg} key={item.id}>
            <ImgContainer>
              <LazyLoad height={100} offset={40} once placeholder={<Placeholder />}>
                <Image src={process.env.PUBLIC_URL + item.img} />
              </LazyLoad>
            </ImgContainer>
            <InfoContainer>
              <Title>{item.title}</Title>
              <Desc>{item.desc}</Desc>
              <ButtonContainer>
                <OutlinedButton text={'SHOP NOW'} link={'/products'} />
              </ButtonContainer>
            </InfoContainer>
          </Slide>
        ))}
      </Wrapper>
      <Arrow direction='right' onClick={() => handleClick('right')}>
        <ArrowRightOutlined />
      </Arrow>
    </Container>
  );
};

export default Slider;
