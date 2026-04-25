import mongoose from "mongoose";

// Creates schema for expense_categories collection
const expenseCategorySchema = new mongoose.Schema({
    _id: String,
    name: String
},{collection: 'expense_categories'});

// Creates ExpenseCategory model using expenseCategorySchema
const ExpenseCategory = mongoose.model('ExpenseCategory', expenseCategorySchema);

export default ExpenseCategory; // Exports model