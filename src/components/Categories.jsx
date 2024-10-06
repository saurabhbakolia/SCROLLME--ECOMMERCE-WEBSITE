// Categories.js
import styled from 'styled-components';
import { categories } from '../data';
import CategoryItem from './CategoryItem';
import { mobile } from '../responsive';

const Container = styled.div`
    display: flex;
    padding: 40px;
    justify-content: space-between;
    gap: 30px; /* Gap between items */
    align-items: stretch; /* Ensure equal heights */
    flex-wrap: wrap; /* Allow wrapping on smaller screens */
    border-radius: 30px; /* Set border radius */
    background-color: white; /* Add background color to see the border radius */
    overflow: hidden; /* Ensure the border radius is visible by hiding overflow */
    ${mobile({ flexDirection: 'column', gap: '10px' })}; /* Stack items vertically on mobile */
`;

const Categories = () => {
    return (
        <Container>
            {categories.map((item) => (
                <CategoryItem item={item} key={item.id} />
            ))}
        </Container>
    );
};

export default Categories;
