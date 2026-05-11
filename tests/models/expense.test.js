import mongoose from "mongoose";
import { expect } from 'chai';
import Expense from '../../models/expense.js';
import ExpenseCategory from '../../models/expenseCategory.js';
import '../test_helper.js';

describe('Expense Modal', () => {
    let category;

    // Creates a new category in the database before each test.
    beforeEach(async () => {
        category = await ExpenseCategory.create({_id:"FOOD", name:'Food'});
    });

    // Test case: Checks if an expense can be created successfully
    it('Should create an expense successfully', async () => {
        const expense = new Expense({
            user_id: 'USER_2',
            description: 'Lunch',
            amount: 10,
            date: new Date(),
            category_id: category._id
        });

        const savedExpense = await expense.save();

        expect(savedExpense._id).to.exist; // Checks that the expense has an ID, indicating it was saved successfully.
        expect(savedExpense.user_id).to.equal('USER_2'); // Checks that the user ID matches USER_2.

    });

    // Test case: Checks if an expense can be updated successfully
    it('Should update an expense successfully', async () => {
        const expense = new Expense({
            user_id: 'USER_2',
            description: 'Dinner',
            amount: 20,
            date: new Date(),
            category_id: category._id
        });

        const savedExpense = await expense.save();

        savedExpense.description = 'Family Dinner';
        savedExpense.amount = 25;

        const updatedExpense = await savedExpense.save();

        expect(updatedExpense.description).to.equal('Family Dinner'); // Checks that decription has been updated.
        expect(updatedExpense.amount).to.equal(25); // Checks that the amount has been updated.
        expect(updatedExpense._id).to.equal(savedExpense._id); // Checks that the correct expense has been updated.

    });
});