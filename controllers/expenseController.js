import mongoose from "mongoose";
import Expense from "../models/expense.js";
import ExpenseCategory from "../models/expenseCategory.js";

/**
 * Function: createExpense
 * Description: Takes the response and request body as params and creates a new expense within the Mongo database
 * @param {*} res 
 * @param {*} req 
 * Returns: Creates a new expense within the Mongo database if successful. Otherwise returns appropriate error and status codes.
 */
export const createExpense = (req, res) => {
    // Extracts fields from the request body
    const {user_id, description, amount, date, categoryName} = req.body;

    // Finds the expense category by name
    ExpenseCategory.findOne({name: categoryName})
    // If the category does not exist then returns the 400 status code with error message
    .then(category => {
        if(!category) {
            return res.status(404).json({error: 'Category not found.'});
        }

        // Creates the new expense
        return Expense.create({
            user_id,
            description,
            amount,
            date,
            category_id: category._id
        });
    })
    .then(expense => {
        // If expense._id exists then returns the 201 status code with message
        if(expense._id){
            return res.status(201).json({id: expense._id, message: "Expense created successfully."});
        }
    })
    .catch(error => {
        // Check if error is Validation error
        if(error instanceof mongoose.Error.ValidationError) {
            // Return status code 400
            res.status(400).send({message: 'Validation failed.', details: error.errors});
        } else {
            // Return status code 500 with error message
            console.error("Error creating expense: ", error);
            res.status(500).json({error: "Server error."});
        }
    });
};

/**
 * Function: updateExpense
 * Description: Takes the request and response body as params and updates an existing expense within the Mongo database
 * @param {*} req 
 * @param {*} res
 * Returns:  Updates an existing expense within the Mongo database. Otherwise returns the appropriate error and status codes.
 */
export const updateExpense = (req, res) => {
    // Extracts required fields from request body
    const {description, amount, date, categoryName} = req.body;
    // Finds the category by name
    ExpenseCategory.findOne({name: categoryName})
    .then(category => {
        // If the category does not then returns status code 400 with error message
        if(!category) {
            return res.status(404).json({error: 'Category not found.'});
        }
        // Finds and updates the existing expense
        return Expense.findByIdAndUpdate(req.params.id, {
            description,
            amount,
            date,
            category_id: category._id
        }, {new: true}); // Returns the updated document
    })
    .then(updatedExpense => {
        // If the updated expense does not exist then returns the status code 404 with error message
        if(!updatedExpense){
            return res.status(404).json({error: "Expense not found."});
        }
        // Returns the status code 200 with message
        return res.status(200).json({message: "Expense updated successfully."});
    })
    .catch(error => {
        // Returns the status code 500 with error message
        console.error("Error updating expense: ", error);
        res.status(500).json({error: "Server error."});
    });
};

/**
 * Function: deleteExpense
 * Description: Deletes an existing expense from the Mongo database.
 * @param {*} req 
 * @param {*} res 
 * Returns: If the expense to be deleted does not exist then returns the appropriate error and status codes.
 */
export const deleteExpense = (req, res) => {
    Expense.findByIdAndDelete(req.params.id)
    .then(expense => {
        // If the category does not then returns status code 400 with error message
        if(!expense) {
            return res.status(404).json({error: 'Expense not found.'});
        }
        // Returns the status code 200 with message
        return res.status(200).json({
            message: "Expense deleted successfully.",
            deletedExpense: expense
        });
    })
    .catch(error => {
        // Returns the status code 500 with error message
        console.error("Error deleting expense: ", error);
        res.status(500).json({error: "Server error."});
    });
};