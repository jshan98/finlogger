import mongoose from "mongoose";

// Creates schema for expenses collection
const expenseSchema = new mongoose.Schema({
    user_id: String,
    description: String,
    amount: Number,
    date: Date,
    category_id: {type: String, ref: "ExpenseCategory", required:true},
    active: {type: Boolean, default: true }     //“active” field for soft delete functionality
});

const Expense = mongoose.model('Expense', expenseSchema); // Creates model using expenseSchema

export default Expense; // Exports model