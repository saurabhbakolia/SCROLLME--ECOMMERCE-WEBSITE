import { useEffect, useState } from 'react';
import { MdOutlineKeyboardArrowUp } from 'react-icons/md';
import styled from 'styled-components';

const Button = styled.button`
  position: fixed;
  bottom: 30px;
  right: 10px;
  background-color: #374151;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  opacity: 0.8;
  color: white;
  padding: 1rem;
  border-radius: 9999px;
  box-shadow:
    0 10px 15px rgba(0, 0, 0, 0.1),
    0 4px 6px rgba(0, 0, 0, 0.05);
  transition:
    background-color 0.2s ease,
    opacity 0.2s ease,
    transform 0.2s ease;
  z-index: 50;
  cursor: pointer;

  &:hover {
    background-color: #111827;
    opacity: 1;
    transform: translateY(-3px);
  }
`;

const BackToTopButton = () => {
  const [showButton, setShowButton] = useState(false);

  // Show or hide the button when the user scrolls
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    const scrollDuration = 700;
    const scrollStep = -window.scrollY / (scrollDuration / 15);

    const scrollAnimation = () => {
      if (window.scrollY !== 0) {
        window.scrollBy(0, scrollStep);
        requestAnimationFrame(scrollAnimation);
      }
    };

    requestAnimationFrame(scrollAnimation);
  };

  return (
    <>
      {showButton && (
        <Button onClick={scrollToTop}>
          <MdOutlineKeyboardArrowUp />
        </Button>
      )}
    </>
  );
};

export default BackToTopButton;
