import { useState } from 'react';

const useTableSelection = (items) => {
  const [selectedRows, setSelectedRows] = useState([]);

  const toggleSelectAllRows = () => {
    if (selectedRows.length === items.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(items.map((row) => row._id));
    }
  };

  const toggleSelectRow = (rowId) => {
    setSelectedRows((prevSelected) =>
      prevSelected.includes(rowId) ? prevSelected.filter((id) => id !== rowId) : [...prevSelected, rowId]
    );
  };

  const deleteSelectedRows = () => {
    const remainingRows = items.filter((row) => !selectedRows.includes(row._id));
    setSelectedRows([]);
    return remainingRows;
  };

  const isRowSelected = (rowId) => selectedRows.includes(rowId);

  return {
    selectedRows,
    toggleSelectAllRows,
    toggleSelectRow,
    isRowSelected,
    setSelectedRows,
    deleteSelectedRows,
  };
};

export default useTableSelection;
