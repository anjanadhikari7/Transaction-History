import { Container } from "react-bootstrap";
import TopNavBar from "../components/topNavBar";
import { useDispatch, useSelector } from "react-redux";
import TransactionForm from "../components/transactionForm";
import TransactionTable from "../components/transactionTable";
import { useEffect } from "react";
import { getTransactionAction } from "../redux/transaction/transactionAction";

const TransactionPage = () => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTransactionAction(user._id));
  }, [dispatch, user._id]);
  return (
    <Container>
      <TopNavBar userName={user.name} />

      {/* Transaction Form */}
      <TransactionForm userId={user._id} />

      {/* Transaction Table */}
      <TransactionTable />
    </Container>
  );
};

export default TransactionPage;
