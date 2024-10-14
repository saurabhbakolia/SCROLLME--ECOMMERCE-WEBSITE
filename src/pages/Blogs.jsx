import styles from './Blogs.module.css';
import BlogCard from '../components/utils/Blog';
const Blogs = () => {
  const BlogsData = [
    {
      image: '/images/blogs img 1.jpg',
      date: Date.now(),
      text: 'Stay cozy this winter with our selection of warm and stylish clothing. From plush coats to insulated jackets, we have everything you need to brave the cold. Layer up with soft sweaters, scarves, and gloves for added comfort. Our collection features quality fabrics to keep you warm while looking great. Shop now to find your perfect winter wardrobe essentials.',
    },
    {
      image: '/images/blogs img 2.jpg',
      date: Date.now(),
      text: 'Elevate your wardrobe with versatile pieces that can be styled for any occasion. Mix and match bold prints with classic neutrals to create fresh, unique outfits. Incorporate timeless essentials like blazers and tailored pants for effortless sophistication. Accessorize with statement pieces to add personality to your look. Discover your personal style with our curated collection.',
    },
    {
      image: '/images/blogs img 3.jpg',
      date: Date.now(),
      text: 'Stay ahead of the curve with the latest fashion trends of the season. Bold colors, oversized fits, and eco-friendly fabrics are making waves. Animal prints and metallics continue to dominate runways, adding flair to any outfit. Discover chic, minimalist designs perfect for a modern wardrobe update. Explore our new arrivals and be the first to rock these trending styles!',
    },
  ];

  return (
    <>
      <h1 className={styles.heading}>Recent Updates</h1>
      <br />
      <div className={styles.blogsContainer}>
        {BlogsData.map((el) => {
          return (
            <BlogCard
              key={el.image}
              image={el.image}
              date={el.date}
              text={el.text}
            />
          );
        })}
      </div>
    </>
  );
};

export default Blogs;
