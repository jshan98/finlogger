import ExpenseCategory from '../models/expenseCategory.js';

/**
 * Function: getAllExpenseCategories
 * Description: gets all the expense categories from the expense categories collection within the finlogger database.
 * @param {*} req 
 * @param {*} res 
 */
export const getAllExpenseCategories = (req, res) => {
    // Fteches all the expense categories
    ExpenseCategory.find({}, 'name')
    .then(categories => {
        // Extracts the category names from the categories Array
        const categoryNames = categories.map(category => category.name);
        // Returns the status code 200 with the category names
        res.status(200).json({categories: categoryNames});
    })
    .catch (error => {
        // Returns the status code 500 with an error message
        console.error("Error fetching expense categories: ", error);
        res.status(500).json({error: "Server error"});
    });
}