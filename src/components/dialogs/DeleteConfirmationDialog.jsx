import styled from 'styled-components';

const DialogOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
`;

const DialogContainer = styled.div`
    background-color: white;
    padding: 20px;
    border-radius: 8px;
    max-width: 400px;
    width: 100%;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
    text-align: center;
`;

const DialogTitle = styled.h3`
    margin: 0 0 10px;
    font-size: 18px;
`;

const DialogButtons = styled.div`
    margin-top: 20px;
    display: flex;
    justify-content: space-around;
`;

const ConfirmButton = styled.button`
    padding: 8px 16px;
    background-color: teal;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
`;

const CancelButton = styled.button`
    padding: 8px 16px;
    background-color: grey;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
`;

const DeleteConfirmationDialog = ({ isOpen, onConfirm, onCancel }) => {
    if (!isOpen) return null;

    return (
        <DialogOverlay>
            <DialogContainer>
                <DialogTitle>Confirm Deletion</DialogTitle>
                <p>Are you sure you want to delete the selected items?</p>
                <DialogButtons>
                    <ConfirmButton onClick={onConfirm}>Yes, Delete</ConfirmButton>
                    <CancelButton onClick={onCancel}>Cancel</CancelButton>
                </DialogButtons>
            </DialogContainer>
        </DialogOverlay>
    );
};

export default DeleteConfirmationDialog;
