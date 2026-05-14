// ExpenseModalContext.js

import { createContext, useContext, useState } from "react";
import ExpenseModal from '../components/ExpenseModal.js';

const ExpenseModalContext = createContext();

export const ExpenseModalProvider = ({ children }) => {
    const [showModal, setShowModal] = useState(false);
    const [modalMode, setModalMode] = useState(null);
    const [modalData, setModalData] = useState({
        "_id":"",
        "description":"",
        "amount":0,
        "date":"",
        "categoryName":"",
    }); 

    // Sets showModal to true, sets modalMode to mode parameter, and sets modalData to data parameter 
    const handleShow = (mode, data) => {
        setShowModal(true);
        setModalMode(mode);
        setModalData(data);
    }

    // Reverts showModal, modalMode, and modalData to their base initializations 
    const handleClose = () => {
        setShowModal(false);
        setModalMode(null);
        setModalData({
            "_id":"",
            "description":"",
            "amount":0,
            "date":"",
            "categoryName":"",
        });
    }

    return (
        <ExpenseModalContext.Provider
            value={{
                showModal,
                modalMode,
                modalData,
                handleShow,
                handleClose
            }} >
            {children} {showModal && <ExpenseModal />} {/* If showModal == true render the ExpenseModal component */}
        </ExpenseModalContext.Provider>
    );
};

// Custom hook to use ExpenseModalContext in other components
export const useExpenseModal = () => {
    return useContext(ExpenseModalContext);
};