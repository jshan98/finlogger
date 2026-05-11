import React from "react";
import { render, fireEvent, screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import ExpenseDetails from '../../components/ExpenseDetails';
import { useExpenseModal } from "../../context/ExpenseModalContext";
import { useAppContext } from "../../context/AppContext";
import '@testing-library/jest-dom/extend-expect';
import { expect } from "chai";

// Mocks the useExpenseModal hook.
jest.mock('../../context/ExpenseModalContext', () => ({ useExpenseModal : jest.fn() }));
// Mocks useAppContext hook.
jest.mock('../../context/AppContext', () => ({ useAppContext : jest.fn() }));

// Test suite for expense details component
describe('Expense Details Component', () => {
    // Mocks handleShow function
    const handleShowMock = jest.fn();
    // Mocks setExpenseToBeDeleted function
    const setExpenseToBeDeletedMock = jest.fn();
    // Mocks fetchExpenseData function
    const fetchExpenseDataMock = jest.fn();
    // Mocks showToast function 
    const showToastMock = jest.fn();
    // Variable to store deleted expense ID
    let expenseIdToBeDeleted = null;

    // BeforeEach hook that provides mock functions before each test
    beforeEach(() => {
        setExpenseToBeDeletedMock.mockImplementation(id => {expenseIdToBeDeleted = id;});

        // Mock implementation of useExpenseModal
        useExpenseModal.mockReturnValue({ handleShow : handleShowMock });
    });

    // Test 1: Renders ExpenseDetails with correct data
    test('Renders ExpenseDetails with correct data', () => {
        // Renders ExpenseDetails component with mock data
        render(<ExpenseDetails data={mockExpenses}/>);
        // Asserts Expense Details title
        expect(screen.getByText('Expense Details')).toBeInTheDocument();
        // Asserts 1st mock description and amount
        expect(screen.getByText('Groceries').toBeInTheDocument());
        expect(screen.getByText('$50').toBeInTheDocument());
        // Asserts 2nd mock description and amount
        expect(screen.getByText('Rent').toBeInTheDocument());
        expect(screen.getByText('$1000').toBeInTheDocument());
    });

    // Test 2: Opens delete confirmation modal when delete button is clicked
    test('Opens delete confirmation modal when delete button is clicked', () => {
        // Renders ExpenseDetails component
        render(<ExpenseDetails data={mockExpenses}/>);

        // Simulate clicking the first delete button
        const deleteButtons = screen.getByAltText('Delete');
        fireEvent.click(deleteButtons[0]);

        // Asserts that the setExpenseToBeDeletedMock function is called with the expense ID 1
        expect(setExpenseToBeDeletedMock).toHaveBeenCalledWith('1');
        // Asserts that the expenseToBeDeleted is 1
        expect(expenseIdToBeDeleted).toBe('1');
    });
});