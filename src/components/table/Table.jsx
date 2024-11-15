import styled from 'styled-components';

const TableWrapper = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin: 20px auto;
  font-size: 16px;
  overflow: hidden;
  box-shadow: 0 1px 1px rgba(177, 166, 166, 0.05);
  background-color: #fff;
`;

const TableHeader = styled.thead`
  font-weight: 600;
  background-color: #f7f8fa;
`;

const Tr = styled.tr`
  &:nth-child(even) {
    background-color: #f3f4f6;
  }
`;

const Th = styled.th`
  border: 1px solid #ddd;
  padding: 10px;
  color: grey;
  text-transform: capitalize;
  font-weight: 400;
  text-align: left;
`;

const CheckboxTh = styled(Th)`
  width: 40px;
  text-align: center;
`;

const Td = styled.td`
  border: 1px solid #ddd;
  padding: 14px;
  text-align: left;
  color: #333;
  font-size: 14px;
`;

const CheckboxTd = styled(Td)`
  width: 40px;
  text-align: center;
`;

const StatusBadge = styled.span`
  padding: 2px 4px;
  border-radius: 12px;
  font-size: 0.65rem;
  font-weight: 400;
  text-transform: capitalize;
  border: 1px solid
    ${(props) => {
      switch (props.status) {
        case true:
          return '#04771f';
        case false:
          return '#ff00153b';
        default:
          return '#85020d';
      }
    }};
  color: ${(props) => {
    switch (props.status) {
      case true:
        return '#04771f';
      case false:
        return '#85020d';
      default:
        return '#f0f0f0';
    }
  }};
  background-color: ${(props) => {
    switch (props.status) {
      case true:
        return '#00ff3c14';
      case false:
        return '#ff001522';
      default:
        return '#f0f0f0';
    }
  }};
`;

const Image = styled.img`
  width: 30px;
  height: 30px;
  margin-right: 8px;
  border-radius: 4px;
  object-fit: cover;
  object-position: top;
`;

const Flex = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 4px;
`;

const ActionButton = styled.button`
  color: teal;
  font-weight: 500;
`;

const Table = ({ items, columns, selectedRows, toggleSelectAllRows, toggleSelectRow, isRowSelected }) => {
  return (
    <TableWrapper>
      <TableHeader>
        <Tr>
          {columns.map((column, index) =>
            column.isCheckbox ? (
              <CheckboxTh key={index}>
                <input
                  type='checkbox'
                  checked={selectedRows.length === items.length && items.length > 0}
                  onChange={toggleSelectAllRows}
                  style={{ accentColor: 'teal' }}
                />
              </CheckboxTh>
            ) : (
              <Th key={index}>{column.label}</Th>
            )
          )}
        </Tr>
      </TableHeader>
      <tbody>
        {items.map((product) => (
          <Tr key={product._id}>
            <CheckboxTd>
              <input
                type='checkbox'
                checked={isRowSelected(product._id)}
                onChange={() => toggleSelectRow(product._id)}
                style={{ accentColor: 'teal' }}
              />
            </CheckboxTd>
            <Td>
              <Flex>
                <Image src={product.imageUrl} alt={product.name} />
                {product.name}
              </Flex>
            </Td>
            <Td>{product.category}</Td>
            <Td>{product.price}</Td>
            <Td>{product.stock}</Td>
            <Td>
              <StatusBadge status={product.isActive}>{product.isActive ? 'active' : 'in active'}</StatusBadge>
            </Td>
            <Td>
              <ActionButton>Details</ActionButton>
            </Td>
          </Tr>
        ))}
      </tbody>
    </TableWrapper>
  );
};

export default Table;
