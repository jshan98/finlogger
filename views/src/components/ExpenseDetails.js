import { Table, Col } from "react-bootstrap";
import DeleteConfirmationModal from './DeleteConfirmationModal';
import { useExpenseModalContext } from "../context/ExpenseModalContext";
import { useAppContext } from "../context/AppContext";
import { useState } from "react";
import { response } from "express";

/**
 * Function: updateDateFormat
 * Description: reformats the parameter to the correcr format.
 * @param {*} date 
 * @returns formatted date (MM/DD/DayOfTheWeek)
 */
function updateDateFormat(date){
    const d1 = new Date(date);
    const month = d1.toLocaleString("en-us", {month:"short"});
    const day = d1.getDate();
    const dayOfWeek = d1.toLocaleString("en-us", {weekday:"short"});
    return (`${month} ${day}, ${dayOfWeek}`); //Note to self: use => ` <= with date formats and not => ' <= (Addendum: arrows are only for emphasis)
}

/**
 * Function: ExpenseDetails
 * Description: Handles the editing and deleting of an expense. Also handles the showing and closing of the ExpenseModal
 * @param {*} data
 * @returns JSX for ExpenseDetails component
 */
function ExpenseDetails({data}){
    const { handleShow } = useExpenseModalContext();
    const { ExpenseIdToBeDeleted, setExpenseIdToBeDeleted, fetchExpenseData, showToast} = useAppContext();
    const [showDM, setShowDM] = useState(false);

    const handleEdit = (event, expense) => {
        event.preventDefault();
        handleShow("edit", expense);
    };

    const handleDMShow = (event, expenseId) => {
        event.preventDefault();
        setShowDM(true);
        setExpenseIdToBeDeleted(expenseId);
    } ;

    const handleDMClose = () => {
        setShowDM(false);
    };
    
    // Handles the deletion of an expense
    const handleDelete = () => {
        fetch(`http://localhoast:3001/expenses/${ExpenseIdToBeDeleted}`, {
            method: 'DELETE'
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Failed to delete expense! Response status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            fetchExpenseData(); // Refreshes expense data
            showToast("Expense Deleted Successfully!"); // Shows Toast notification with successful message
            console.log("Item deleted", data);
        })
        .catch(error => {
            console.error('Error deleting expense ', error);
            showToast('Error deleting expense!'); // Shows Toast notification with error message
        })
        .finally(() => {
            setExpenseIdToBeDeleted(null); // Resets expenseIdToBeDeleted
            handleDMClose(); // Closes modal window
        })
    };
    

    const tableItems = data.map((expense) => {
        return (
            <tr key={expense._id} >
                <td className="text-nowrap">{updateDateFormat(expense.date)}</td>
                <td>{expense.description}</td>
                <td>${expense.amount}</td>
                <td>
                    <a
                        href="#"
                        className="me-2 edit expButton"
                        onClick={(e) => handleEdit(e, expense)}
                    >
                        <img src="./images/edit.png" alt="Edit" />
                    </a>
                    <a 
                        href="#"
                        className="delete"
                        onClick={(e) => handleDMShow(e, expense._id)}
                    >
                        <img src="./images/delete.png" alt="Delete" />
                    </a>
                </td>
            </tr>
        );
    });

    return (
        <Col md="8">
            <p className="heading">Expense Details</p>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th width="31%">DATE</th>
                        <th width="31%">DESCRIPTION</th>
                        <th width="31%">AMOUNT</th>
                        <th width="7%" className="editDeleteTd"></th>
                    </tr>
                </thead>
                <tbody>{tableItems}</tbody>
            </Table>
            {showDM && <DeleteConfirmationModal 
                showDM={showDM}
                handleDMClose={handleDMClose}
                handleDelete={handleDelete} // To be defined
            />}
        </Col>
    );
}

export default ExpenseDetails;