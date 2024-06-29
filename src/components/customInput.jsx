import { Form } from "react-bootstrap";

const CustomInput = (props) => {
  const { label, handleOnChange, inputAttributes } = props;
  return (
    <Form.Group className="mb-3">
      <Form.Label className="fw-bold">{label}</Form.Label>

      <Form.Control onChange={handleOnChange} {...inputAttributes} />
    </Form.Group>
  );
};

export default CustomInput;
