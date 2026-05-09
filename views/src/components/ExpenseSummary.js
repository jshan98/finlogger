import { Table, Col } from "react-bootstrap";

/**
 * Function: ExpenseSummary
 * Description: takes data as props and creates/ populates the expense summary table for the expense summary component.
 * @param {*} data 
 * @returns JSX for expense summary component
 */
function ExpenseSummary({data}) {
    const tableItems = data.map((dataRow) => {
        return(
            <tr key={dataRow.categoryName}>
                <td>{dataRow.categoryName}</td>
                <td>{dataRow.percentage}</td>
            </tr>
        );
    });

    return (
        <Col md="4">
            <p className="heading">Expense Summary</p>
            <Table striped border hover id="expense-summary" >
                <thead>
                    <tr>
                        <th>EXPENSE CATEGORY</th>
                        <th>%</th>
                    </tr>
                </thead>
                <tbody>{tableItems}</tbody>
            </Table>
        </Col>
    );
}

export default ExpenseSummary;