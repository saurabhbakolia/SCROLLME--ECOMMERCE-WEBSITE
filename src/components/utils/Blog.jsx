import { useState } from 'react';
import styles from './../../pages/Blogs.module.css';

const BlogCard = ({ image, date, text }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const maxLength = 100; // Limit the preview to 100 characters

  const toggleReadMore = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className={styles.blogCard}>
      <div className={styles.image_wrapper}>
        <img src={image} alt="blog" />
      </div>
      <p style={{ fontWeight: 'bold', margin: '0px 0px 0px 30px' }}>
        {new Date(date).toLocaleDateString()}
      </p>
      <p style={{ margin: '0px 0px 0px 30px' }}>
        {isExpanded ? `${text}   ` : `${text.substring(0, maxLength)}...`}
        <button className={styles.readMoreButton} onClick={toggleReadMore}>
          {isExpanded ? 'Read Less' : 'Read More'}
        </button>
      </p>
    </div>
  );
};

export default BlogCard;
