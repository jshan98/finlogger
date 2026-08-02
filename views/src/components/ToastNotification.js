import { useState } from 'react';
import {Toast, ToastContainer} from 'react-bootstrap'; // Imports Toast & ToastContainer components from react-bootstrap
import { useAppContext } from '../context/AppContext.js';

/**
 * Function: ToastNotification
 * Description: Uses Toast & ToastContainer components from react-bootstrap to create a toast notification that displays notifications to the user.
 * @param {*} show 
 * @param {*} message 
 * @param {*} onClose 
 * @returns Toast Notification JSX
 */
function ToastNotification () {
    const { toast, hideToast } = useAppContext();
    //console.log(`Show: ${toast.show}, Message: ${toast.message}`);
    return (
        <ToastContainer position='top-end' className='p-3'>
            <Toast onClose={() => hideToast()} show={toast.show} delay={3000} autohide>
                <Toast.Header>
                    <strong className="me-auto">Notification</strong> {/* Header with strong title */}
                </Toast.Header>
                <Toast.Body>{toast.message}</Toast.Body> {/* Body to display Toast Notification message */}
            </Toast>
        </ToastContainer>
    );
};

export default ToastNotification;
