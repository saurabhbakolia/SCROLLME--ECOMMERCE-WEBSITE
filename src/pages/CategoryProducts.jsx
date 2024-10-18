import { useParams } from 'react-router-dom';

const CategoryProducts = () => {
  const params = useParams();
  return <div>Category: {params.categorySlug}</div>;
};

export default CategoryProducts;
