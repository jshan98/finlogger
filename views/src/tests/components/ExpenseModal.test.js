import React, { use } from "react";
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import ExpenseModal from "../../components/ExpenseModal";
import { useExpenseModal } from "../../context/ExpenseModalContext";
import { useAppContext } from "../../context/AppContext";
import '@testing-library/jest-dom/extend-expect';
import { expect } from "chai";

// Mocks ExpenseModalContext - useExpenseModal hook
jest.mock('../../context/ExpenseModalContext', () => ({
    useExpenseModal : jest.fn()
}));

// Mocks AppContext - useAppContext hook
jest.mock('../../context/AppContext', () => ({
    useAppContext : jest.fn()
}));

describe('Expense Modal Component', () => {
    // Mocks functions for handleClose, showToast, fetchExpenseData
    const handleCloseMock = jest.fn();
    const showToastMock = jest.fn();
    const fetchExpenseDataMock = jest.fn();

    // Mocks data for expense categories
    const expenseCategoriesMock = {
        categories : ['Groceries', 'Rent', 'Utilities'],
    };

    // BeforeEach hook to provide mock functions before each test
    beforeEach(() => {
        // Mock return values for useExpenseModal
        useExpenseModal.mockReturnValue({
            showModal: true, // Modal visible 
            modalMode: 'add', // Modal in add mode
            modalData: {}, // No data for new expense
            handleClose: handleCloseMock // Mocked handleClose function
        });

        // Mock return values for AppContext
        useAppContext.mockReturnValue({
            fetchExpenseData: fetchExpenseDataMock,
            expenseCategories: expenseCategoriesMock,
            showToast: showToastMock
        });

        // Mocks global fetch function to simulate API calls
        fetch = jest.fn((url, options) => 
            Promise.resolve({
                ok: true,
                json: () => Promise.resolve({}),
            })
        );

        // Test 1: Show validation errors if form is submitted with empty fields
        test('', async () => {
            render(<ExpenseModal />); // Renders ExpenseModal component

            fireEvent.click(screen.getByText('Submit')); // Simulates clicking the submit button

            // Waits for validation messages to appear, then verifies them.
            await waitFor(() => {
                expect(screen.getByText('Please provide a valid date.')).toBeInTheDocument();
                expect(screen.getByText('Please select a category.')).toBeInTheDocument();
                expect(screen.getByText('Please provide a description.')).toBeInTheDocument();
                expect(screen.getByText('Please provide an amount.')).toBeInTheDocument();
            });
        });

        // Test 2: Simulates form submission and verifies the API call
        test('', async () => {
            render(<ExpenseModal />); // Renders ExpenseModal component
            // Fills date with field '2021-07-20'
            fireEvent.change(screen.getByLabelText('Date'), {target : {value : '2021-07-20'}});
            // Fills category with field 'Groceries'
            fireEvent.change(screen.getByLabelText('Category'), {target : {value : 'Groceries'}});
            // Fills description with field 'Milk and Eggs'
            fireEvent.change(screen.getByLabelText('Description'), {target : {value : 'Milk and Eggs'}});
            // Fills amount with field '10'
            fireEvent.change(screen.getByLabelText('Amount'), {target : {value : '10'}});
            // Simulates the clicking of the submit button
            fireEvent.click(screen.getByText('Submit'));
            
            // Asserts - Waits for the fetch API call and verifies that it was made with the correct parameters
            await waitFor(() => {
                expect(fetch).toHaveBeenCalledWith('http://localhost:3001/expenses', {
                    method: 'POST',
                    headers: {'content-type' : 'application/json'},
                    body: JSON.stringify({
                        user_id: 'USER_1',
                        description: 'Milk and Eggs',
                        amount: 10,
                        date: '2021-07-20',
                        categoryName: 'Groceries'
                    })
                });
                // Verifies that the showToast and data refresh were triggered
                expect(showToastMock).toHaveBeenCalledWith('Expense submitted successfully!');
                expect(fetchExpenseDataMock).toHaveBeenCalled();
                expect(handleCloseMock).toHaveBeenCalled(); // Ensures that the modal has been closed after submission
            });
        });
    });
});