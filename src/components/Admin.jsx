import { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Container = styled.div`
  padding: 20px;
  text-align: center;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const Th = styled.th`
  border: 1px solid #ddd;
  padding: 12px;
  background-color: #f2f2f2;
`;

const Td = styled.td`
  border: 1px solid #ddd;
  padding: 12px;
`;

const Button = styled.button`
  padding: 5px 10px;
  margin: 5px;
  background-color: teal;
  color: white;
  border: none;
  cursor: pointer;

  &:hover {
    background-color: darkcyan;
  }
`;

const Admin = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/product/list');
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

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/product/${id}`);
      setProducts(products.filter((product) => product._id !== id));
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const handleAddNewProduct = () => {
    navigate(`/admin/product/add`);
  };

  return (
    <Container>
      <h1>Admin Panel - Manage Products</h1>
      <Button onClick={handleAddNewProduct}>Add New Product</Button>
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
            <Th>Description</Th>
            <Th>Actions</Th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(products) && products.length > 0 ? (
            products.map((item, index) => (
              <tr key={item._id}>
                <Td>{index + 1}</Td>
                <Td>{item.name}</Td>
                <Td>{item.stock}</Td>
                <Td>${item.price}</Td>
                <Td>{item.ratings.averageRating}</Td>
                <Td>{item.material}</Td>
                <Td>{item.color}</Td>
                <Td>{item.brand}</Td>
                <Td>{item.description}</Td>
                <Td>
                  <Button onClick={() => handleUpdate(item)}>Edit</Button>
                  <Button onClick={() => handleDelete(item._id)}>Delete</Button>
                </Td>
              </tr>
            ))
          ) : (
            <tr>
              <Td colSpan='10'>No products available</Td>
            </tr>
          )}
        </tbody>
      </Table>
    </Container>
  );
};

export default Admin;
