import React, { useState, useEffect } from 'react';
import { MdOutlineKeyboardArrowUp } from "react-icons/md";
import './components.css'
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

  // Scroll the page to the top
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <>
      {showButton && (
        <button
          onClick={scrollToTop}
          className="fixed-bottom-right"
        >
          <MdOutlineKeyboardArrowUp />
        </button>
      )}
    </>
  );
};

export default BackToTopButton;
