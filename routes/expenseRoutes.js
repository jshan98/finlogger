import express from 'express';
import * as expenseController from '../controllers/expenseController.js';
import * as expenseCategoryController from '../controllers/expenseCategoryController.js';

// Creates router instance
const router = express.Router();

router.post('/', expenseController.createExpense); // Route for createExpense function
router.put('/:id', expenseController.updateExpense); // Route for updateExpense function
router.delete('/:id', expenseController.deleteExpense); // Route for deleteExpense function
router.get('/', expenseController.getExpenses); // get expenses

export default router;