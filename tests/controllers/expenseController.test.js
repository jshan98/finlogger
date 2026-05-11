import request from 'supertest';
import express from 'express';
import { expect } from 'chai';
import {createExpense, updateExpense, deleteExpense, getExpenses, getExpenseSummary} from '../../controllers/expenseController.js';
import Expense from '../../models/expense.js';
import ExpenseCategory from '../../models/expenseCategory.js';
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

    // Test case for the create expense API success
    it('Should create an expense', async () => {
        // Creates category for the expense.
        const category = await ExpenseCategory.create({_id: "EDUCATION", name: 'Education'}); 
        const res = await request(app)
            .post('/expenses')
            .send({
                user_id: 'USER_2',
                description: 'Fees',
                amount: 70,
                date: '2020-07-08',
                categoryName: 'Education'
            });
        // Validates API response.
        expect(res.status).to.equal(201);
        // Checks that response body contains 'Expense created successfully'.
        expect(res.body.message).to.equal('Expense created successfully.');
    });

    // Test case for the create expense API failure
    it('Should return 400 if required validation fails', async () => {
        // Creates category for the expense.
        const category = await ExpenseCategory.create({_id: "HOUSING", name: 'Housing'}); 
        const res = await request(app)
            .post('/expenses')
            .send({
                user_id: 'USER_2',
                amount: 100,
                date: '2020-07-01',
                categoryName: 'Housing'
            });
        // Validates API response.
        expect(res.status).to.equal(400);
        // Checks that response body contains 'Expense created successfully'.
        expect(res.body.error).to.equal('Validation Failed.');
    });

    // Test case for the update expense API success
    it('Should update an expense', async () => {
        // Creates category for the expense.
        const category = await ExpenseCategory.create({_id: "TRANSPORT", name: 'Transport'}); 
        const expense = await Expense.create({
                user_id: 'USER_2',
                description: 'Bus',
                amount: 5,
                date: '2020-07-08',
                category_id: 'Transport'
            });
        const res = await request(app)
            .put(`/expenses/${expense._id}`)
            .send({
                description: 'Train',
                amount: 15,
                date: '2020-07-09',
                categoryName: 'Transport'
            });
        // Validates API response.
        expect(res.status).to.equal(200);
        // Checks that response body contains 'Expense created successfully'.
        expect(res.body.message).to.equal('Expense updated successfully.');
    });
});