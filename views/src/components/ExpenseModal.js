// import { expenseCategories } from "../data";
import { useExpenseModal } from "../context/ExpenseModalContext";
import { Modal, Button, Form } from 'react-bootstrap';
import { useState } from "react";
import { useAppContext } from '../context/AppContext';
import { response } from "express";
/**
 * Function: ExpensesModal
 * Description: Acts as the functional side of the ExpenseModal functional component. Handles submissions, expense edits, and JSX. 
 * @param none
 * @returns JSX for the ExpenseModal component
 */
function ExpenseModal() {
    // Destructures modal-related state & methods from custom hook
    const {showModal, modalMode, modalData, handleClose} = useExpenseModal();
    // Local state for managing form validation
    const [validated, setValidated] = useState(false);
    // Destructures methods & date from app context
    const {expenseCategories, fetchExpenseData, showToast} = useAppContext();

    // Maps through expense categories to create options for the categories select dropdown
    const categories = expenseCategories.categories.map((item) => {
        return (
            <option value={item} key={item}>
                {item}
            </option>
        );
    });

    // handles the submit event for the ExpenseModal component
    const handleSubmit = (event) => {
            const form = document.getElementById("expenseForm");
            
            event.preventDefault(); // Prevents default form submission behavior
            event.stopPropagation(); // Stops propagation of the event
            setValidated(true); // Sets validation state to true

            if(form.checkValidity() === false){
                console.log("Form is invalid");
                return; // Exit if form is invalid

            setValidated(false); // Sets validation state to false

            // Prepares expense data for API call
            const expenseData = {
                user_id: "USER_1",
                description: document.getElementById("expenseForm.description"),
                amount: parseFloat(document.getElementsById("expenseForm.amount")),
                date: document.getElementById("expenseForm.date"),
                categoryName: document.getElementById("expenseForm.categoryName")
            };

            // Sets API URL & method based on modalMode
            const apiURL = modalMode === "add" ? "http://localhost:3001/expenses" :
                                                `http://localhost:3001/expenses/${modalData._id}`
            const method = modalMode === "add" ? "POST" : "PUT";

            // Makes API call to add or edit expense
            fetch(apiURL, {
                method: method,
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(expenseData),
            })
            .then(response => {
                if(!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(result => {
                console.log(modalMode === "add" ? "Expense submitted successfully: " : "Expense saved successfully: ", expenseData.categoryName);
                showToast(modalMode === "add" ? "Expense submitted successfully!" : "Expense saved successfully!");
                fetchExpenseData();
                handleClose();
            })
            .catch (error => {
                console.error(modalMode === "add" ? "Error submitting expense: " : "Error saving expense: ", error);
                showToast(modalMode === "add" ? "Error submitting expense!" : "Error saving expense!");
            });
        };

        return (
            <Modal show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        {modalMode === "add" ? "Add Expenses" : "Edit Expense"}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form noValidate validated={validated} id="expenseForm">

                        {/* Form Group for Date input */}
                        <Form.Group controlId="expenseForm.dateInput" className="mb-1">
                            <Form.Label>Date</Form.Label>
                            <Form.Control 
                                type="date"
                                required
                                defaultValue={modalMode === "add" ? "" : modalData.date.split("T")[0]}
                            />
                            <Form.Control.Feedback type="invalid">
                                Please provide a valid date.
                            </Form.Control.Feedback>
                        </Form.Group>

                        {/* Form Group for Category input */}
                        <Form.Group controlId="expenseForm.category" className="mb-1">
                            <Form.Label>Category</Form.Label>
                            <Form.Select 
                                defaultValue={modalMode === "add" ? "" : modalData.categoryName}
                                required
                            >
                                <option value="">--Select Category--</option>
                                {categories}
                            </Form.Select>
                            <Form.Control.Feedback type="invalid">
                                Please select a category.
                            </Form.Control.Feedback>
                        </Form.Group>

                        {/* Form Group for Description input */}
                        <Form.Group controlId="expenseForm.description" className="mb1">
                            <Form.Label>Description</Form.Label>
                            <Form.Control 
                                type="text"
                                placeholder="Enter description"
                                required
                                defaultValue={modalMode === "add" ? "" : modalData.description}
                            />
                            <Form.Control.Feedback type="invalid">
                                Please provide a description.
                            </Form.Control.Feedback>
                        </Form.Group>

                        {/* Form Group for Amount input */}
                        <Form.Group controlId="expenseForm.amount" className="mb-1">
                            <Form.Label>Amount</Form.Label>
                            <Form.Control 
                                type="number"
                                placeholder="Enter amount"
                                required
                                defaultValue={modalMode === "add" ? "" : modalData.amount}
                            />
                            <Form.Control.Feedback type="invalid">
                                Please provide an amount.
                            </Form.Control.Feedback>
                        </Form.Group>

                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button type="submit" variant="primary" onClick={handleSubmit}>
                        {modalMode === "add" ? "Submit" : "Save Changes"}
                    </Button>
                </Modal.Footer>
            </Modal>
        );
    }
}

export default ExpenseModal;