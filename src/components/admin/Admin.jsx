import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import Announcement from '../Announcement';
import { deleteProductAPI, listProductsAPI } from '../../services/products/productService';
import Table from '../table/Table';
import { Button } from '../../styles/Button';
import AddIcon from '@mui/icons-material/Add';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import useTableSelection from '../../hooks/useTableSelection';
import DeleteConfirmationDialog from '../dialogs/DeleteConfirmationDialog';
import { Box, useToast } from '@chakra-ui/react';
import AdminAppBar from './AdminAppBar';
import IconButton from '../Buttons/IconButton';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { H1 } from '../../styles/Text';

const Container = styled.div`
  padding: 20px;
  text-align: center;
  background-color: #F5F5F7;
`;

const TableWrapper = styled.div`
  border-radius: 6px;
  background-color: #fff;
  padding: 20px 0;
`;

const TableHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  padding: 0 14px;
`;

const AdminPageHeading = styled(H1)`
  display: block;
  margin: 24px 12px;
  font-size: 1.2rem;
  text-align: start;
`;

const AdminPageTitle = styled(H1)`
  margin-inline-end: 20px;
`;

const FlexLeft = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 6px;
`;

const AddProductButton = styled(Button)`
  gap: 2px;
`;

const DeleteButton = styled(Button)`
  gap: 2px;
`;

const ActionButtons = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 10px;
`;

const Admin = () => {
  const [products, setProducts] = useState([]);
  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const navigate = useNavigate();
  const toast = useToast();
  const { selectedRows, setSelectedRows, toggleSelectAllRows, toggleSelectRow, isRowSelected, deleteSelectedRows } = useTableSelection(products);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await listProductsAPI();
        const response = await listProductsAPI();
        setProducts(response.products);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  // const handleUpdate = (product) => {
  //   navigate(`/admin/update/${product._id}`, { state: { product } });
  // };

  const handleDelete = async () => {
    setDeleteDialogOpen(true);
    try {
      for (const productId of selectedRows) {
        await deleteProductAPI(productId);
        toast({
          position: 'bottom-right',
          status: 'success',
          duration: 2000,
          isClosable: true,
          render: () => (
            <Box color='white' p={3} bg='teal' borderRadius={4}>
              Product Deleted Successfully!
            </Box>
          ),
        });
      }

      setProducts(products.filter((product) => !selectedRows.includes(product._id)));
      setSelectedRows([]);
      deleteSelectedRows();
      setDeleteDialogOpen(false);
    } catch (error) {
      console.error('Error deleting products:', error);
      toast({
        position: 'bottom-right',
        status: 'error',
        duration: 2000,
        isClosable: true,
        render: () => (
          <Box color='white' p={3} bg='#C62E2E' borderRadius={4}>
            Error deleting products. Please try again.
          </Box>
        ),
      });
      setDeleteDialogOpen(false);
    }
  };

  const handleAddNewProduct = () => {
    navigate(`/admin/product/add`);
  };

  const columns = [
    { label: 'Select', isCheckbox: true },
    { label: 'Product Name', key: 'name' },
    { label: 'Category', key: 'category' },
    { label: 'Price', key: 'price' },
    { label: 'Stock', key: 'stock' },
    { label: 'Status', key: 'status' },
    { label: 'Action', key: 'action' },
  ];

  console.log("selected rows:", selectedRows);

  return (
    <>
      <Announcement />
      <AdminAppBar />
      <Container>
        <AdminPageHeading>Products</AdminPageHeading>
        <TableWrapper>
          <TableHeader>
            <FlexLeft>
              <AdminPageTitle>Products List</AdminPageTitle>
              <IconButton icon={<ArrowBackIosIcon />} />
              <IconButton icon={<ArrowForwardIosIcon />} />
            </FlexLeft>
            <ActionButtons>
              {selectedRows.length > 0 && <DeleteButton onClick={() => setDeleteDialogOpen(true)}><DeleteOutlineIcon /> Delete</DeleteButton>}
              <AddProductButton onClick={handleAddNewProduct}><AddIcon />Add Product</AddProductButton>
            </ActionButtons>
          </TableHeader>
          <Table
            items={products}
            columns={columns}
            selectedRows={selectedRows}
            toggleSelectRow={toggleSelectRow}
            toggleSelectAllRows={toggleSelectAllRows}
            isRowSelected={isRowSelected}
          />
        </TableWrapper>
        <DeleteConfirmationDialog
          isOpen={isDeleteDialogOpen}
          onCancel={() => setDeleteDialogOpen(false)}
          onConfirm={handleDelete}
        />
      </Container>
    </>
  );
};

export default Admin;
