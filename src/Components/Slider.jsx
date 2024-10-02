import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { ArrowLeftOutlined, ArrowRightOutlined } from "@mui/icons-material";
import { slideItems } from "../data";
import { mobile, tablet } from "../responsive";
import { motion, AnimatePresence } from "framer-motion";
import { useSwipeable } from "react-swipeable";

const Container = styled(motion.div)`
  width: 100%;
  height: 100vh;
  position: relative;
  overflow: hidden;
  ${mobile({ height: "80vh" })}
`;

const Arrow = styled(motion.div)`
  width: 50px;
  height: 50px;
  background-color: rgba(255, 255, 255, 0.3);
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
  opacity: 0.8;
  z-index: 2;
  color: white;
  transition: all 0.3s ease;

  &:hover {
    background-color: rgba(255, 255, 255, 0.5);
    transform: scale(1.1);
  }

  ${mobile({ 
    width: "30px", 
    height: "30px", 
    fontSize: "0.8rem",
    top: "auto", 
    bottom: "60px", 
    backgroundColor: "rgba(0, 0, 0, 0.3) "
  })}
`;
const Wrapper = styled(motion.div)`
  height: 100%;
  display: flex;
`;

const Slide = styled(motion.div)`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  background-color: ${(props) => props.bg};
  position: absolute;
`;

const ImgContainer = styled.div`
  height: 100%;
  width: 100%;
  position: absolute;
`;

const Image = styled(motion.img)`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const InfoContainer = styled(motion.div)`
  position: absolute;
  top: 50%;
  left: 10%;
  transform: translateY(-50%);
  padding: 50px;
  text-align: left;
  color: white;
  z-index: 1;
  ${tablet({ left: "5%", padding: "30px" })}
  ${mobile({ 
    left: "50%", 
    top: "40%", 
    transform: "translate(-50%, -50%)", 
    width: "90%", 
    padding: "20px",
    textAlign: "center",
    backgroundColor: "rgba(0, 0, 0, 0.4) ",
    borderRadius: "10px" ,
  })}
`;

const Title = styled(motion.h1)`
  font-size: 70px;
  margin-bottom: 20px;
  color: #ffffff;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  ${tablet({ fontSize: "50px" })}
  ${mobile({ 
    fontSize: "28px", 
    marginBottom: "10px"
  })}
`;

const Desc = styled(motion.p)`
  margin: 30px 0px;
  font-size: 20px;
  font-weight: 500;
  letter-spacing: 3px;
  max-width: 500px;
  color: #f0f0f0;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
  ${tablet({ fontSize: "16px", maxWidth: "300px" })}
  ${mobile({ 
    fontSize: "14px", 
    margin: "10px 0", 
    letterSpacing: "1px",
    maxWidth: "100%"
  })}
`;

const StyledButton = styled(motion.button)`
  padding: 12px 24px;
  font-size: 18px;
  font-weight: bold;
  color: #b3b3b3;
  background-color: rgba(255, 255, 255, 0.1);
  border: 2px solid #ffffff;
  border-radius: 30px;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  z-index: 1;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 0;
    height: 100%;
    background-color: #ffffff;
    transition: all 0.3s ease;
    z-index: -1;
  }

  &:hover {
    color: #000000;
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
  }

  &:hover:before {
    width: 100%;
  }

  &:active {
    transform: scale(0.95);
  }

  ${mobile({ 
    padding: "8px 16px",
    fontSize: "14px",
    marginTop: "10px"
  })}
`;

const ProgressBar = styled.div`
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 10px;
  z-index: 2;
  ${mobile({ bottom: "20px" })}
`;

const ProgressDot = styled(motion.div)`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: ${(props) =>
    props.active ? "#fff" : "rgba(255, 255, 255, 0.5)"};
  cursor: pointer;
  ${mobile({ 
    width: "8px",
    height: "8px"
  })}
`;

const Slider = () => {
  const [slideIndex, setSlideIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setSlideIndex((prevIndex) => (prevIndex + 1) % slideItems.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const handleClick = (clickDirection) => {
    setDirection(clickDirection === "left" ? -1 : 1);
    if (clickDirection === "left") {
      setSlideIndex(slideIndex > 0 ? slideIndex - 1 : slideItems.length - 1);
    } else {
      setSlideIndex(slideIndex < slideItems.length - 1 ? slideIndex + 1 : 0);
    }
  };

  const handlers = useSwipeable({
    onSwipedLeft: () => handleClick("right"),
    onSwipedRight: () => handleClick("left"),
    preventDefaultTouchmoveEvent: true,
    trackMouse: true
  });

  const variants = {
    enter: (direction) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  };

  return (
    <Container {...handlers}>
      <Arrow
        direction="left"
        onClick={() => handleClick("left")}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <ArrowLeftOutlined style={{ fontSize: "inherit" }} />
      </Arrow>
      <AnimatePresence initial={false} custom={direction}>
        <Wrapper>
          <Slide
            bg={slideItems[slideIndex].bg}
            key={slideIndex}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
            }}
          >
            <ImgContainer>
              <Image
                src={process.env.PUBLIC_URL + slideItems[slideIndex].img}
                alt={slideItems[slideIndex].title}
                initial={{ scale: 1.2 }}
                animate={{ scale: 1 }}
                transition={{ duration: 6 }}
                style={{ objectFit: "cover", objectPosition: "center center" }}
              />
            </ImgContainer>
            <InfoContainer>
              <Title
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.8 }}
              >
                {slideItems[slideIndex].title}
              </Title>
              <Desc
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.8 }}
              >
                {slideItems[slideIndex].desc}
              </Desc>
              <StyledButton
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.3 }}
                onClick={() => (window.location.href = "/products")}
              >
                SHOP NOW
              </StyledButton>
            </InfoContainer>
          </Slide>
        </Wrapper>
      </AnimatePresence>
      <Arrow
        direction="right"
        onClick={() => handleClick("right")}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <ArrowRightOutlined style={{ fontSize: "inherit" }} />
      </Arrow>
      <ProgressBar>
        {slideItems.map((_, index) => (
          <ProgressDot
            key={index}
            active={index === slideIndex}
            onClick={() => setSlideIndex(index)}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.8 }}
          />
        ))}
      </ProgressBar>
    </Container>
  );
};

export default Slider;