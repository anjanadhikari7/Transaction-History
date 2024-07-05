import { Button, Card, Col, Form, Row } from "react-bootstrap";
import CustomInput from "./customInput";
import { useState } from "react";
const initialFormData = {
  title: "",
  type: "expense",
  date: null,
  amount: 0,
};

const TransactionForm = () => {
  const [formData, setFormData] = useState(initialFormData);
  const { title, type, date, amount } = formData;
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // handle on sumbit

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    //call createTransactionAction
  };

  return (
    <Card>
      <Card.Body>
        <Form onSubmit={handleOnSubmit}>
          <Row>
            <Col>
              <CustomInput
                label="Title"
                handleOnChange={handleOnChange}
                inputAttributes={{
                  type: "text",
                  name: "title",
                  value: title,
                  placeholder: "Enter transaction title",
                  required: true,
                }}
              />
            </Col>
            <Col>
              <Form.Group>
                <Form.Label className="fw-bold">Type</Form.Label>
                <Form.Select name="type" value={type} onChange={handleOnChange}>
                  <option value="expense">Expense</option>
                  <option value="income">Income</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <CustomInput
                label="Date"
                handleOnChange={handleOnChange}
                inputAttributes={{
                  type: "date",
                  name: "date",
                  value: date,
                  placeholder: "Enter transaction date",
                  required: true,
                }}
              />
            </Col>
            <Col>
              <CustomInput
                label="Amount"
                handleOnChange={handleOnChange}
                inputAttributes={{
                  type: "number",
                  name: "amount",
                  value: amount,
                  placeholder: "Enter transaction amount",
                  required: true,
                }}
              />
            </Col>
          </Row>
          <Button variant="primary" type="submit">
            Add Transaction
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default TransactionForm;
