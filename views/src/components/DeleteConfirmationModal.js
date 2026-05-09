import {Modal, Button} from 'react-bootstrap';

/**
 * Function: DeleteConfirmationModal
 * Description: Takes showDM, handlDMClose, and handleDelete as props and returns the JSX for the DeleteConfirmationModal component.
 * @param {*} showDM
 * @param {*} handleDMClose
 * @param {*} handleDelete
 * @returns JSX for DeleteConfirmationModal
 */
function DeleteConfirmationModal({ showDM, handleDMClose, handleDelete }){
    return (
        <Modal show={showDM} onHide={handleDMClose} >
            <Modal.Header closeButton>
                <Modal.Title >Delete Expense</Modal.Title>
            </Modal.Header>
            <Modal.Body >
                <p>Are you sure you want to delete this expense?</p>
            </Modal.Body>
            <Modal.Footer >
                <Button variant='secondary' onClick={handleDMClose}>Cancel</Button>
                <Button variant='primary' onClick={handleDelete}>Delete</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default DeleteConfirmationModal;