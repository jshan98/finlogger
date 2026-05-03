import {Toast, ToastContainer} from 'react-bootstrap'; // Imports Toast & ToastContainer components from react-bootstrap

/**
 * Function: ToastNotification
 * Description: Uses Toast & ToastContainer components from react-bootstrap to create a toast notification that displays notifications to the user.
 * @param {*} show 
 * @param {*} message 
 * @param {*} onClose 
 * @returns Toast Notification JSX
 */
const ToastNotification = (show, message, onClose) => {
    return (
        <ToastContainer position='top-end' className='p-3'>
            <Toast onClose={onClose} show={show} delay={3000} autohide>
                <Toast.Header>
                    <strong className="me-auto">Notification</strong> {/* Header with strong title */}
                </Toast.Header>
                <Toast.Body>{message}</Toast.Body> {/* Body to display Toast Notification message */}
            </Toast>
        </ToastContainer>
    );
};

export default ToastNotification;
