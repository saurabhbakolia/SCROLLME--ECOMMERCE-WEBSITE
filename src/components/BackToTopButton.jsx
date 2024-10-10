import React, { useState, useEffect } from 'react';
import { MdOutlineKeyboardArrowUp } from "react-icons/md";
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
          className="fixed bottom-10 right-10 bg-gray-700 drop-shadow-2xl opacity-80 text-white p-3 rounded-full shadow-lg hover:bg-gray-900 transition z-50"
        >
          <MdOutlineKeyboardArrowUp/>
        </button>
      )}
    </>
  );
};

export default BackToTopButton;
