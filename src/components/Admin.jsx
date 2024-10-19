// import React from "react";
import styled from "styled-components";

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
 

  const handleUpdate = (id) => {
    console.log(`Update product with id: ${id}`);
    // Add update logic here
  };

  const handleDelete = (id) => {
    console.log(`Delete product with id: ${id}`);
    // Add delete logic here
  };

  const products = [
    {
      id: 1,
      name: "Wireless Headphones",
      quantity: 15,
      price: "$120",
      rating: "4.7",
      material: "Plastic & Metal",
      color: "Black",
      brand: "AudioTech",
      description: "High-quality wireless headphones with noise-canceling feature",
    },
    {
      id: 2,
      name: "Smartphone",
      quantity: 8,
      price: "$999",
      rating: "4.8",
      material: "Aluminum & Glass",
      color: "Space Gray",
      brand: "TechBrand",
      description: "Latest model smartphone with 5G connectivity and powerful camera",
    },
    {
      id: 3,
      name: "Fitness Tracker",
      quantity: 25,
      price: "$80",
      rating: "4.2",
      material: "Silicone",
      color: "Blue",
      brand: "FitLife",
      description: "Waterproof fitness tracker with heart rate monitoring",
    },
    {
      id: 4,
      name: "Laptop",
      quantity: 5,
      price: "$1200",
      rating: "4.6",
      material: "Aluminum",
      color: "Silver",
      brand: "ComputeMax",
      description: "Powerful laptop with 16GB RAM and 512GB SSD",
    },
    {
      id: 5,
      name: "Running Shoes",
      quantity: 20,
      price: "$150",
      rating: "4.3",
      material: "Mesh & Rubber",
      color: "Red",
      brand: "SportX",
      description: "Comfortable running shoes for long-distance running",
    },
  ];
  

  return (
    <Container>
      <h1>Admin Panel - Manage Products</h1>
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
          {products.map((product, index) => (
            <tr key={product.id}>
              <Td>{index + 1}</Td>
              <Td>{product.name}</Td>
              <Td>{product.quantity}</Td>
              <Td>{product.price}</Td>
              <Td>{product.rating}</Td>
              <Td>{product.material}</Td>
              <Td>{product.color}</Td>
              <Td>{product.brand}</Td>
              <Td>{product.description}</Td>
              <Td>
                <Button onClick={() => handleUpdate(product.id)}>Update</Button>
                <Button onClick={() => handleDelete(product.id)}>Delete</Button>
              </Td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default Admin;
