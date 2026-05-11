import request from 'supertest';
import express from 'express';
import { expect } from 'chai';
import {createExpense, updateExpense, deleteExpense, getExpenses, getExpenseSummary} from '../../controllers/expenseController.js';
import Expense from '../../models/expense';
import ExpenseCategory from '../../models/expenseCategory';
import '../test_helper.js';

// Express test server
const app = express();
app.use(express.json()); 

// Routes for expense controller tests
app.post('/expenses', createExpense);
app.put('/expenses/:id', updateExpense);
app.delete('/expenses/:id',deleteExpense);
app.get('/expenses', getExpenses);
app.get('/expense-summary', getExpenseSummary);

// Test suite for expense controller
describe('Expense Controller', () => {
    
});