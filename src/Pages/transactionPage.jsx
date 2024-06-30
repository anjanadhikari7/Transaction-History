import { Container } from "react-bootstrap";
import TopNavBar from "../components/topNavBar";
import { useSelector } from "react-redux";
import TransactionForm from "../components/transactionForm";

const TransactionPage = () => {
  const { user } = useSelector((state) => state.user);
  return (
    <Container>
      <TopNavBar userName={user.name} />

      {/* Transaction Form */}
      <TransactionForm />

      {/* Transaction Table */}
    </Container>
  );
};

export default TransactionPage;
