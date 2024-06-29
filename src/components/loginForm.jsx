import { Button, Form, Spinner } from "react-bootstrap";
import CustomInput from "./customInput";
import { useState } from "react";
import { loginUser } from "../axios/userAxios";
import { toast } from "react-toastify";

const initialFormData = {
  name: "",
  email: "",
};
const LoginForm = () => {
  const [formData, setFormData] = useState(initialFormData);
  const { email, password } = formData;
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle on Change

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Form Submit

  const handleOnSumbit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // call axios

    const result = await loginUser(formData);

    setIsSubmitting(false);
    if (result.status === "error") {
      return toast.error(result.message);
    }

    // Success
    toast.success(result.message);
  };
  return (
    <Form onSubmit={handleOnSumbit}>
      <CustomInput
        label="Email"
        handleOnChange={handleOnChange}
        inputAttributes={{
          type: "email",
          name: "email",
          placeholder: "Enter your Email",
          value: email,
          required: true,
        }}
      />
      <CustomInput
        label="Password"
        handleOnChange={handleOnChange}
        inputAttributes={{
          type: "password",
          name: "password",
          placeholder: "Enter your Password",
          value: password,
          required: true,
        }}
      />

      <Button variant="primary" type="submit" disabled={isSubmitting}>
        {isSubmitting ? (
          <Spinner
            as="span"
            animation="border"
            size="sm"
            role="status"
            aria-hidden="true"
          />
        ) : (
          "Login"
        )}
      </Button>
    </Form>
  );
};

export default LoginForm;
