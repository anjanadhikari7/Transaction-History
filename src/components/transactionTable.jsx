import { useState } from "react";
import { Button, ButtonGroup, Form, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { deleteTransactionAction } from "../redux/transaction/transactionAction";

const TransactionTable = () => {
  const dispatch = useDispatch();
  const { transactions } = useSelector((state) => state.transaction);
  const { user } = useSelector((state) => state.user);
  const expenseAmount = transactions
    .filter((transaction) => transaction.type === "expense")
    .reduce((acc, curr) => acc + curr.amount, 0);

  const incomeAmount = transactions
    .filter((transaction) => transaction.type === "income")
    .reduce((acc, curr) => acc + curr.amount, 0);

  const totalBalance = incomeAmount - expenseAmount;

  // Logic to implement selection of transactions which we want to delete
  const [selectedTransactionIds, setSelectedTransactionIds] = useState([]);

  const toggleId = (transactionId) => {
    // check if the id is already in the selectedArray

    // if (selectedTransactionIds.includes(transactionId)) {
    //   const updatedIds = selectedTransactionIds.filter(
    //     (id) => id !== transactionId
    //   );
    //   setSelectedTransactionIds(updatedIds);
    //   return;
    // }

    // setSelectedTransactionIds([...selectedTransactionIds, transactionId]);

    setSelectedTransactionIds((prevState) => {
      if (prevState.includes(transactionId)) {
        const updatedIds = selectedTransactionIds.filter(
          (id) => id !== transactionId
        );
        return updatedIds;
      } else {
        return [...prevState, transactionId];
      }
    });
  };
  const handleOnDeleteSelected = () => {
    dispatch(deleteTransactionAction(selectedTransactionIds, user._id));
  };
  const allTransactionIds = transactions.map((transaction) => transaction._id);

  const handleOnDeleteAll = () => {
    dispatch(deleteTransactionAction(allTransactionIds, user._id));
  };

  return (
    <Table striped bordered hover className="text-center">
      <thead>
        <tr>
          <th>#</th>
          <th>Date</th>
          <th>Title</th>
          <th>Type</th>
          <th>Amount</th>
          <th>
            <ButtonGroup size="sm">
              <Button
                variant="outline-danger"
                onClick={() => handleOnDeleteAll()}
                disabled={!allTransactionIds?.length}
              >
                Delete All
              </Button>
              <Button
                variant="outline-warning"
                onClick={() => handleOnDeleteSelected()}
                disabled={!selectedTransactionIds.length}
              >
                Delete Selected
              </Button>
            </ButtonGroup>
          </th>
        </tr>
      </thead>

      <tbody>
        {transactions.map((transaction, index) => {
          return (
            <tr key={transaction._id}>
              <td>{index + 1}</td>
              <td>{new Date(transaction.date).toLocaleDateString()}</td>
              <td>{transaction.title}</td>
              <td>{transaction.type}</td>
              <td>
                {transaction.type === "expense" ? (
                  <span className="text-danger">${transaction.amount}</span>
                ) : (
                  <span className="text-success">${transaction.amount}</span>
                )}
              </td>
              <td>
                <Form name={transaction._id}>
                  <Form.Check
                    type="checkbox"
                    name={transaction._id}
                    onClick={() => toggleId(transaction._id)}
                  />
                </Form>
              </td>
            </tr>
          );
        })}

        <tr>
          <td colSpan={5} className="text-end mr-4">
            <strong>
              Total balance:
              {totalBalance < 0 ? (
                <span className="text-danger">-${totalBalance * -1}</span>
              ) : (
                <span className="text-success">${totalBalance}</span>
              )}
            </strong>
          </td>
          <td></td>
        </tr>
      </tbody>
    </Table>
  );
};

export default TransactionTable;
