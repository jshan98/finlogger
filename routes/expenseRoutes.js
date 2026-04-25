import express from 'express';
import * as expenseController from '../controllers/expenseController.js';
import * as expenseCategoryController from '../controllers/expenseCategoryController.js';

// Creates router instance
const router = express.Router();

router.post('/', expenseController.createExpense); // Route for createExpense function

export default router;