import styled from "styled-components";
import { slideItems } from "../data"; // Your existing data
import { useState, useEffect, useRef } from "react";
import { mobile, tablet } from '../responsive';
import LazyLoad from "react-lazyload";
import { ArrowLeftOutlined, ArrowRightOutlined } from "@mui/icons-material";
import OutlinedButton from "./OutlinedButton";

const Container = styled.div`
  width: 100%;
  height: 70vh;
  overflow: hidden;
  position: relative;
  display: flex;
  ${mobile({ height: '55vh' })}
  ${mobile({ height: '60vh' })}
`;

const Wrapper = styled.div`
  display: flex;
  height: 100%;
  transform: translateX(${(props) => props.translate}px);
  transition: transform ${(props) => props.duration}s ease-in-out;
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
  flex: 1;
  height: 100%;
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
  justifyContent: 'flex-start',
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
  
  ${tablet({ fontSize: '14px', margin: '10px 5px' })}
  ${mobile({ fontSize: '10px', margin: '4px 0' })}
`;

const ButtonContainer = styled.div`
    position: relative; /* Default position */
  margin-top: 0;

  /* Position absolutely for small devices */
  ${mobile({
  position: 'absolute',
  top: '20px',
  right: '20px',
})}
`;

const Arrow = styled.div`
  width: 50px;
  height: 50px;
  background-color: rgba(255, 255, 255, 0.7);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  bottom: 0;
  left: ${(props) => props.direction === "left" && "10px"};
  right: ${(props) => props.direction === "right" && "10px"};
  margin: auto;
  cursor: pointer;
  z-index: 10;
  opacity: 0.5;
  transition: opacity 0.3s ease;

  &:hover {
    opacity: 1;
  }
`;

const Slider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const [slideWidth, setSlideWidth] = useState(window.innerWidth); // Initial slide width
  const intervalRef = useRef(null);

  const totalSlides = slideItems.length;
  const slides = [slideItems[totalSlides - 1], ...slideItems, slideItems[0]]; // Duplicate for looping effect

  // Update slide width on window resize
  useEffect(() => {
    const handleResize = () => setSlideWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const startAutoSlide = () => {
    intervalRef.current = setInterval(() => {
      handleNextSlide();
    }, 5000); // Automatic slide interval
  };

  const stopAutoSlide = () => {
    clearInterval(intervalRef.current);
  };

  useEffect(() => {
    startAutoSlide();

    return () => stopAutoSlide(); // Cleanup on unmount
  }, []);

  const handleNextSlide = () => {
    setIsTransitioning(true);
    setCurrentIndex((prevIndex) => prevIndex + 1);
  };

  const handlePrevSlide = () => {
    setIsTransitioning(true);
    setCurrentIndex((prevIndex) => prevIndex - 1);
  };

  const handleTransitionEnd = () => {
    if (currentIndex === totalSlides + 1) {
      setIsTransitioning(false);
      setCurrentIndex(1);
    } else if (currentIndex === 0) {
      setIsTransitioning(false);
      setCurrentIndex(totalSlides);
    }
  };

  const handleManualSlide = (direction) => {
    stopAutoSlide();
    if (direction === "right") {
      handleNextSlide();
    } else {
      handlePrevSlide();
    }
    setTimeout(startAutoSlide, 5000); // Restart auto-slide after 5 seconds
  };

  const calculateTranslate = () => {
    return -currentIndex * slideWidth;
  };

  return (
    <Container>
      {/* Left Arrow */}
      <Arrow direction="left" onClick={() => handleManualSlide("left")}>
        <ArrowLeftOutlined />
      </Arrow>

      <Wrapper
        translate={calculateTranslate()}
        duration={isTransitioning ? 0.8 : 0}
        onTransitionEnd={handleTransitionEnd}
      >
        {slides.map((item, index) => (
          <Slide bg={item.bg} key={index}>
            <ImgContainer>
              <LazyLoad height={100}>
                <Image src={process.env.PUBLIC_URL + item.img} />
              </LazyLoad>
            </ImgContainer>
            <InfoContainer>
              <Title>{item.title}</Title>
              <Desc>{item.desc}</Desc>
              <ButtonContainer>
                <OutlinedButton text="SHOP NOW" link="/products" />
              </ButtonContainer>
            </InfoContainer>
          </Slide>
        ))}
      </Wrapper>

      {/* Right Arrow */}
      <Arrow direction="right" onClick={() => handleManualSlide("right")}>
        <ArrowRightOutlined />
      </Arrow>
    </Container>
  );
};

export default Slider;
