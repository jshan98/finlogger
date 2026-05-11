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
});