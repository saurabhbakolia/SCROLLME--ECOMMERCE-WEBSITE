import { useEffect } from 'react';

const ScrollToTop = () => {
    useEffect(() => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth'
        });
    }, []);

    return null; // this component doesn't render anything, hence null
}

export default ScrollToTop