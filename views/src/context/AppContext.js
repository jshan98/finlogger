// AppContext.js

import { createContext, useContext, useState, useEffect } from "react";
// import { expenseData, expenseSummaryData as summaryData, expenseCategories as categoriesData } from '../data';
import ToastNotification from "../components/ToastNotification";

// Create a new context for the app
const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const [month, setMonth] = useState("2020-01");
    const [expenseSummaryData, setExpenseSummaryData] = useState(null);
    const [expenseDetailsData, setExpenseDetailsData] = useState(null);
    const [totalExpenses, setTotalExpenses] = useState(0);
    const [expenseCategories, setExpenseCategories] = useState(null);
    const [expenseIdToBeDeleted, setExpenseIdToBeDeleted] = useState(null);

    // Sets the state variable that controls the toast notification
    const [toast, setToast] = useState({show: false, message: ""});

    // Function to show toast notification
    const showToast = (message) => {
        setToast({show: true, message: message});
    };

    // Function to hide toast notification
    const hideToast = () => {
        console.log("I was told to close");
        setToast({show: false, message: ""});
    };

    // Function to fetch expense categories data from the API
    const fetchExpenseCategories = async () => {
        try {
            // API call to fetch expense categories
            const response = await fetch("http://localhost:3001/expenses/categories");

            // Checks if the received response is okay (ok), if not then throws an error.
            if(!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            // Parses the response data as JSON
            const data = await response.json();

            // Updates the state with the fetched categories.
            setExpenseCategories(data);
        } catch (error) {
            // Logs any errors that may occur during the fetch
            console.error("Error fetching Expense Categories: ", error);
        }
    };

    // Function to fetch expense & summary data from the API
    const fetchExpenseData = async () => {
        try {
            // API call to fetch expense summary data for a specific month
            const responseSummary = await fetch(`http://localhost:3001/expenses/summary?userId=USER_1&month=${month}`);

            // Checks if the received responseSummary is okay (ok), if not then throws an error.
            if(!responseSummary.ok) {
                throw new Error(`HTTP error! Status: ${responseSummary.status}`);
            }

            // Parses the response data as JSON
            const dataSummary = await responseSummary.json();

            // Updates the state with the fetched summary and details.
            setExpenseSummaryData(dataSummary);
        } catch (error) {
            // Logs any errors that may occur during the fetch
            console.error("Error fetching Expense Categories: ", error);
        }

        try {
            // API call to fetch expense details data for a specific month
            const responseDetails = await fetch(`http://localhost:3001/expenses/?userId=USER_1&month=${month}`);

            // Checks if the received responseDetails is okay (ok), if not then throws an error.
             if (!responseDetails.ok){
                throw new Error(`HTTP error! Status: ${responseDetails.status}`);
            }

            // Parses the response data as JSON
            const dataDetails = await responseDetails.json();

            // Updates the state with the fetched details.
            setExpenseDetailsData(dataDetails);
            setTotalExpenses(dataDetails.totalExpenses);
        } catch (error) {
            // Logs any errors that may occur during the fetch
            console.error("Error fetching Expense Categories: ", error);
        }
    };

    // fetch expense & summary data on initial load and when the month changes
    useEffect(() => {
        fetchExpenseData();
    });

    // fetch expense categories data when the month changes
    useEffect(() => {
        fetchExpenseCategories();
    }, []);

    return (
        <AppContext.Provider
            value={{
                month,
                expenseSummaryData,
                expenseDetailsData,
                totalExpenses,
                expenseCategories,
                expenseIdToBeDeleted,
                setMonth,
                setExpenseIdToBeDeleted,
                fetchExpenseData,
                showToast,
            }} >
            {children}
            {/* Renders ToastNotification component */}
            {/* <ToastNotification show={toast.show} message={toast.message} onClose={hideToast} /> */}
        </AppContext.Provider>
    );
};

// Custom hook to use AppContext in other components
export const useAppContext = () => {
    return useContext(AppContext);
};