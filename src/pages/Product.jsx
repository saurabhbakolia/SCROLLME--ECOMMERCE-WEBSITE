import styled from "styled-components";
import Navbar from '../components/Navbar';
import Announcement from '../components/Announcement';
import Newsletter from '../components/Newsletter';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { mobile, tablet } from '../responsive';
import { useParams } from "react-router-dom";
import { allProducts } from "../data";
import { useEffect, useState } from "react";
import Footer from "../components/Footer";

const Product = () => {
    const [product, setProduct] = useState(null);
    const [selectedColor, setSelectedColor] = useState(""); // Track selected color
    const [displayedImage, setDisplayedImage] = useState(""); // Track displayed image
    const params = useParams();

    useEffect(() => {
        // Fetch the product based on productId
        const selectedProduct = allProducts.find((item) => item.id === Number(params.productId));
        if (selectedProduct) {
            setProduct(selectedProduct);
            // Default to the first color's image
            setSelectedColor(selectedProduct.colors[0].color);
            setDisplayedImage(selectedProduct.colors[0].img);
        }
    }, [params.productId]);

    // Function to handle color change
    const handleColorClick = (color, img) => {
        setSelectedColor(color);
        setDisplayedImage(img); // Update the displayed image when a color is clicked
    };

    return (
        <Container>
            <Navbar />
            <Announcement />
            <Wrapper>
                <ImgContainer>
                    {product && <Image src={displayedImage} alt={product.title} />} {/* Display selected color's image */}
                </ImgContainer>
                <InfoContainer>
                    <Title>{product?.title}</Title>
                    <Desc>{product?.desc}</Desc>
                    <Price>{product?.price}</Price>
                    <FilterContainer>
                        <Filter>
                            <FilterTitle>Color</FilterTitle>
                            {/* Loop through available colors and render each color option */}
                            {product?.colors.map((colorOption, index) => (
                                <FilterColor 
                                    key={index} 
                                    color={colorOption.color} 
                                    onClick={() => handleColorClick(colorOption.color, colorOption.img)} // Update image on click
                                    selected={colorOption.color === selectedColor} // Highlight selected color
                                />
                            ))}
                        </Filter>
                        <Filter>
                            <FilterTitle>Size</FilterTitle>
                            <FilterSize>
                                <FilterSizeOption>XS</FilterSizeOption>
                                <FilterSizeOption>S</FilterSizeOption>
                                <FilterSizeOption>M</FilterSizeOption>
                                <FilterSizeOption>L</FilterSizeOption>
                                <FilterSizeOption>XL</FilterSizeOption>
                            </FilterSize>
                        </Filter>
                    </FilterContainer>
                    <AddContainer>
                        <AmountContainer>
                            <RemoveIcon />
                            <Amount>1</Amount>
                            <AddIcon />
                        </AmountContainer>
                        <Button>ADD TO CART</Button>
                    </AddContainer>
                </InfoContainer>
            </Wrapper>
            <Newsletter />
            <Footer />
        </Container>
    );
};

export default Product;

// Styled components...
const Container = styled.div``;
const Wrapper = styled.div`
    padding: 50px;
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    ${mobile({ flexDirection: "column;" })}
    ${mobile({ padding: "10px;" })}
    ${tablet({ padding: "10px;" })}
`;

const ImgContainer = styled.div`
    flex: 1;
`;

const Image = styled.img`
    width: 100%;
    height: 64vh;
    object-fit: contain;
    ${mobile({ height: "40vh;" })}
    ${mobile({ width: "100%;" })}
    ${tablet({ height: "40vh;" })}
    ${tablet({ width: "100%;" })}
    object-position: center;
`;

const InfoContainer = styled.div`
    flex: 1;
    padding: 0px 50px;
    justify-content: flex-start;
    align-items: flex-start;
    ${mobile({ padding: "4px;" })}
    text-align: left;
`;

const Title = styled.h1`
    font-weight: 200;
`;

const Desc = styled.p`
    margin: 20px 0px;
`;

const Price = styled.span`
    font-weight: 100;
    font-size: 40px;
`;

const FilterContainer = styled.div`
    width: 50%;
    margin: 30px 0px;
    display: flex;
    justify-content: space-between;
`;

const Filter = styled.div`
    display: flex;
    align-items: center;
`;

const FilterTitle = styled.span`
    font-size: 20px;
    font-weight: 200;
`;

const FilterColor = styled.div`
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: ${(props) => props.color};
    margin: 0px 5px;
    cursor: pointer;
    border: ${(props) => (props.selected ? "2px solid teal" : "1px solid black")}; /* Highlight selected color */
`;

const FilterSize = styled.select`
    margin-left: 10px;
    padding: 5px;
`;

const FilterSizeOption = styled.option``;

const AddContainer = styled.div`
    width: 50%;
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

const AmountContainer = styled.div`
    display: flex;
    align-items: center;
    font-weight: 700;
`;

const Amount = styled.span`
    width: 30px;
    height: 30px;
    border-radius: 10px;
    border: 1px solid teal;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0px 5px;
`;

const Button = styled.button`
    padding: 15px;
    border: 2px solid teal;
    background-color: white;
    cursor: pointer;
    font-weight: 500;

    &:hover{
        background-color: #f8f4f4;
    }
`;
