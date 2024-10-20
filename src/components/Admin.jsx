import { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

const Container = styled.div`
  padding: 20px;
  text-align: center;
`;

const TableContainer = styled.div`
  overflow-x: auto;
  margin-top: 20px;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin: 20px 0;
  font-size: 1.1rem;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  background-color: #fff;
`;

const Th = styled.th`
  border: 1px solid #ddd;
  padding: 16px;
  background-color: #00bfa6;
  color: white;
  text-transform: uppercase;
  font-weight: bold;
`;

const Td = styled.td`
  border: 1px solid #ddd;
  padding: 16px;
  text-align: center;
  color: #333;

  &:first-child {
    text-align: left;
  }
`;

const Tr = styled.tr`
  &:nth-child(even) {
    background-color: #e0e0e0; 
  }

  &:nth-child(odd) {
    background-color: #f5f5f5; 
  }

  &:hover {
    background-color: #cccccc; 
  }
`;

const Button = styled.button`
  padding: 10px 15px;
  margin: 5px;
  background-color: #00bfa6;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 5px;
  font-size: 0.9rem;

  &:hover {
    background-color: darkcyan;
  }
`;

const AddButton = styled(Button)`
  margin-bottom: 20px;
  padding: 12px 18px;
  font-size: 1rem;
  background-color: #00796b;

  &:hover {
    background-color: #004d40;
  }
`;

const Admin = () => {
  const URI = "http://localhost:8080"; 
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${URI}/api/product/list`); 
        setProducts(response.data.products);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleUpdate = (product) => {
    navigate(`/admin/update/${product._id}`, { state: { product } });
  };

  const handleDelete = async (productId) => {
    const confirmDelete = window.confirm('Do you really want to delete this product?');

    if (confirmDelete) {
      try {
        await axios.delete(`${URI}/api/product/delete/${productId}`); // Use URI constant here
        setProducts(products.filter((product) => product._id !== productId));
      } catch (error) {
        console.error('Error deleting product:', error);
      }
    }
  };

  const handleAddNewProduct = () => {
    navigate(`/admin/product/add`);
  };

  return (
    <Container>
      <Navbar />
      <br />
      <h1>Admin Panel - Manage Products</h1>
      <AddButton onClick={handleAddNewProduct}>Add New Product</AddButton>
      <TableContainer>
        <Table>
          <thead>
            <tr>
              <Th>Sr.No</Th>
              <Th>Product Name</Th>
              <Th>Quantity</Th>
              <Th>Price</Th>
              <Th>Rating</Th>
              <Th>Material</Th>
              <Th>Color</Th>
              <Th>Brand</Th>
              <Th>Actions</Th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(products) && products.length > 0 ? (
              products.map((item, index) => (
                <Tr key={item._id}>
                  <Td>{index + 1}</Td>
                  <Td>{item.name}</Td>
                  <Td>{item.stock}</Td>
                  <Td>${item.price}</Td>
                  <Td>{item.ratings.averageRating}</Td>
                  <Td>{item.material}</Td>
                  <Td>{item.color}</Td>
                  <Td>{item.brand}</Td>
                  <Td>
                    <Button onClick={() => handleUpdate(item)}>Edit</Button>
                    <Button onClick={() => handleDelete(item._id)}>Delete</Button>
                  </Td>
                </Tr>
              ))
            ) : (
              <Tr>
                <Td colSpan='9'>No products available</Td>
              </Tr>
            )}
          </tbody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default Admin;
